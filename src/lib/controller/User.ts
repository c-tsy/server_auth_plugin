import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class User extends BController{
    
    /**
     * 查询权限组
     */
    async queryUser(data: {UID: string}) {
        return await this.M(Models.Users).where({UID: data.UID}).find()
    }

    /**
     * 查询所有权限组
     */
    async queryUsers() {
        return await this.M(Models.Users).select()
    }
}