import BaseController from '@ctsy/controller/dist/base_controller';
import Controller from '@ctsy/controller/dist/controller';
import { R } from '@ctsy/relation';
import auth from '../..';
export class BController extends BaseController{
    _prefix: any = 'auth_'

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
     * 检查权限
     * @param param0 
     */
    async checkRule(data: { Rule: string }) {
        await this.checkLogin();
        //TODO 检查权限
        return !!(await this._session(auth.Fields.Permission))[data.Rule];
    }
    async R(RelationName) {
        return await R(this._ctx, RelationName, this._prefix);
    }
}
export class CController extends Controller {
    _prefix: any = 'auth_'
    async R(RelationName) {
        return await R(this._ctx, RelationName, this._prefix);
    }
}