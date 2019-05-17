import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class Rule extends BController{
    
    /**
     * 查询权限组
     */
    async queryRule(data: {RID: string}) {
        return await this.M(Models.Rule).where({RID: data.RID}).find()
    }

    /**
     * 查询所有权限组
     */
    async queryRules() {
        return await this.M(Models.Rule).select()
    }
}