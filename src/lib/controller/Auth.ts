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
        if (MD5.password_verify(data.pwd, p, auth.Salt)) {
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
    async forget() {

    }
}