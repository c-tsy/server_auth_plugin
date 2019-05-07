import BaseController from '@ctsy/controller/dist/base_controller';
import Controller from '@ctsy/controller/dist/controller';
import { R } from '@ctsy/relation';
export class BController extends BaseController{
    _prefix:any = 'auth_'
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