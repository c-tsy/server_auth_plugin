import auth from '../..';
import { Models } from '../iface/models';
import { MD5 } from '@ctsy/crypto';
import {BController} from '../lib/controller';
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
            return uid;
        } else {
            await this._session('UID', undefined);
            throw new Error(auth.Errors.E_PWD_ERROR)
        }
    }
    async logout() {
        await this._session('UID', undefined);
        return true;
    }
    async relogin() {
        return await this._session('UID')
    }
    async regist() {

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
        let UID = await this.M(Models.Account).where({ Account: account }).getFields('UID');
        await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd)})
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
        let p = await this.M(Models.Pwd).where({ UID }).getFields('PWD');
        if (auth.Crypto.verify(opwd, p)) {
            await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) });
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