import auth from '../..';
import { Models } from '../iface/models';
import { MD5 } from '@ctsy/crypto';
import {BController} from '../lib/controller';
import { hook_check, HookType } from '../utils';
import Users from '../class/Users';
import Account from '../class/Account';
import Pwd from '../class/Pwd';
export default class AuthController extends BController {
    /**
     * 登陆
     * @param data 
     */
    async login(data) {
        let account = data[auth.Fields.Account];
        let pwd = data[auth.Fields.PWD];
        //需要判断什么情况下必须用户输入验证码或者其他验证方式
        let vcode = data[auth.Fields.VCode];
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        let svcode = await this._session(auth.Fields.VCode);
        if (svcode && svcode != vcode) {
            throw new Error(auth.Errors.E_VCODE);
        }
        await hook_check(this._ctx,'Auth',HookType.before,'login',data)
        let uid = await this.M(Models.Account).where({ Account: account, Status: 1, Type: "PWD" }).getFields('UID');
        if (!uid) {
            throw new Error(auth.Errors.E_ACCOUNT_NOT_EXIST);
        }
        let p = await this.M(Models.Pwd).where({ UID: uid }).getFields('PWD');
        if (!p) {
            throw new Error(auth.Errors.E_PWD_EMPTY);
        }
        if (auth.Crypto.verify(pwd, p)) {
            await this._session('UID', uid);
            await hook_check(this._ctx, 'Auth', HookType.after, 'login', data)
            //通知外部程序去完成诸如只允许在一个地方登录的问题
            //TODO 将用户的权限及权限组信息写入Session中
            return uid;
        } else {
            await this._session('UID', undefined);
            throw new Error(auth.Errors.E_PWD_ERROR)
        }
    }
    /**
     * 退出登录
     */
    async logout() {
        await this._session('UID', undefined);
        return true;
    }
    /**
     * 重新登录
     */
    async relogin() {
        return await this._session('UID')
    }
    /**
     * 注册，如何让外部完成检测工作？
     */
    async regist(data) {
        let account = data[auth.Fields.Account];
        let pwd = data[auth.Fields.PWD];
        //需要判断什么情况下必须用户输入验证码或者其他验证方式
        let vcode = data[auth.Fields.VCode];
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let svcode = await this._session(auth.Fields.VCode);
        if (svcode && svcode != vcode) {
            throw new Error(auth.Errors.E_VCODE);
        }
        if (await this.M(Models.Account).where({ Account: account }).getFields('UID')) {
            //账号已被使用
            throw new Error(auth.Errors.E_ACCOUNT_USED);
        }
        let reg = new Users();
        reg.Name = data.Name || '匿名'
        reg.Sex = data.Sex || -1
        reg.Nick=data.Nick||'匿名'
        let r = await hook_check(this._ctx, 'Auth', HookType.before, 'regist', data)
        if ('object' == typeof r) {
            reg = Object.assign(reg, r);
        }
        try {
            let user = await this.M(Models.Users).add(reg);
            if (user.UID > 0) {
                let account = new Account()
                account.UID = user.UID;
                account.Type = 'PWD';
                account.Status = 1;
                let upwd = new Pwd();
                upwd.UID = user.UID;
                upwd.PWD = auth.Crypto.encode(pwd);
                await Promise.all([
                    this.M(Models.Account).add(account),
                    this.M(Models.Pwd).add(upwd)
                ])
                await hook_check(this._ctx, 'Auth', HookType.after, 'regist', user)
                return user.UID;
            }
        } catch (error) {
            throw new Error(auth.Errors.E_REG_ERROR);
        } finally {
            
        }
    }
    /**
     * 忘记密码，通过验证码找回，验证码需要手动逻辑写入到session中用于读取
     * @param data 
     */
    async forget(data) {
        let pwd = data[auth.Fields.PWD];
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let vcode = data[auth.Fields.VCode];
        if (vcode != await this._session(auth.Fields.VCode)) {
            throw new Error(auth.Errors.E_VCODE);
        }
        let account = data[auth.Fields.Account];
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        await hook_check(this._ctx, 'Auth', HookType.before, 'forget', data)
        let UID = await this.M(Models.Account).where({ Account: account }).getFields('UID');
        await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) })
        await hook_check(this._ctx, 'Auth', HookType.after, 'forget', data)
        return true;
    }
    /**
     * 在登陆成功的情况下修改密码需要原密码参与
     * @param data 
     */
    async reset(data) {
        let pwd = data[auth.Fields.PWD];
        let opwd = data[auth.Fields.OldPWD];
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        if ('string' != typeof opwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(opwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let UID = await this.checkLogin();
        await hook_check(this._ctx, 'Auth', HookType.before, 'reset', data)
        let p = await this.M(Models.Pwd).where({ UID }).getFields('PWD');
        if (auth.Crypto.verify(opwd, p)) {
            await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) });
            await hook_check(this._ctx, 'Auth', HookType.after, 'reset', data)
            return true;
        } else {
            //原始密码错误
            throw new Error(auth.Errors.E_PWD_ERROR)
        }
    }
    /**
     * 检查是否登录
     */
    async checkLogin() {
        let uid = await this._session('UID');
        if (!uid) {
            throw new Error(auth.Errors.E_NOT_LOGIN)
        }
        return uid;
    }
    /**
     * 管理员重置账户
     * @param data 
     */
    async areset(data) {
        let UID = data.UID;
        if (!(UID > 0)) {
            throw new Error(auth.Errors.E_PARAMS);
        }
        //TODO 检查权限是否存在
    }
}