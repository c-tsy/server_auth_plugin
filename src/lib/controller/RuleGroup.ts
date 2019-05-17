import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class RuleGroup extends BController{
    
    /**
     * 查询权限组
     */
    async queryRuleGroup(data: {RGID: string}) {
        return await this.M(Models.RuleGroup).where({RGID: data.RGID}).find()
    }

    /**
     * 查询所有权限组
     */
    async queryRuleGroups() {
        return await this.M(Models.RuleGroup).select()
    }
}