import auth from '../..';
import { Models } from '../iface/models';
import { MD5 } from '@ctsy/crypto';
import {BController} from '../lib/controller';
import { hook_check, HookType } from '../utils';
export default class AuthController extends BController {
    
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
        await hook_check(this._ctx,'Auth',HookType.before,'login',{Account:account,PWD:pwd,VCode:vcode})
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
            await hook_check(this._ctx, 'Auth', HookType.after, 'login', { Account: account, PWD: pwd, VCode: vcode, UID: uid })
            //怎么通知外部程序去完成诸如只允许在一个地方登录的问题
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
        await hook_check(this._ctx, 'Auth', HookType.before, 'forget', { Account: account, PWD: pwd, VCode: vcode })
        let UID = await this.M(Models.Account).where({ Account: account }).getFields('UID');
        await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) })
        await hook_check(this._ctx, 'Auth', HookType.after, 'forget', { Account: account, PWD: pwd, VCode: vcode })
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
        await hook_check(this._ctx, 'Auth', HookType.before, 'reset', {  PWD: pwd,UID,OldPWD:opwd })
        let p = await this.M(Models.Pwd).where({ UID }).getFields('PWD');
        if (auth.Crypto.verify(opwd, p)) {
            await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) });
            await hook_check(this._ctx, 'Auth', HookType.after, 'reset', { PWD: pwd, UID, OldPWD: opwd })
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
}