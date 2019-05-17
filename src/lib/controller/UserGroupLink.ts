import BaseController from '@ctsy/controller/dist/base_controller';
import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class UserGroupLink extends BController{
    /**
     * 增加用户组权限
     * 
     */
    async addGroupLink(data:{UGID: number, RID: number}) {
        let g = {}
        g['UGID'] = data.UGID
        g['RID'] = data.RID
        return await this.M(Models.UserGroupRuleLink).add(g)
    }

    /**
     * 已知用户组查询所有权限
     */
    async findRules(data: {UGID: string}) {
        let rids = await this.M(Models.UserGroupRuleLink).where({UGID: data.UGID}).fields('RID').select()
        return rids.length > 0 ? await this.M(Models.Rule).where({RID: {in: rids}}).select():[]
    }

    /**
     * 删除用户组某权限
     */
    async delRuleLink(data: {UGID: number, RID: number}) {
        return await this.M(Models.UserGroupRuleLink).where({UGID: data.UGID, RID: data.RID}).del()
    }

    /**
     * 删除用户组全部权限
     */
    async delRulesLink(data: {UGID: number}) {
        return await this.M(Models.UserGroupRuleLink).where({UGID: data.UGID}).del()
    }
}