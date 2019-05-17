import BaseController from '@ctsy/controller/dist/base_controller';
import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class Group extends BController{
    /**
     * 获取我的用户组
     */
    async my(data) {
        let ugids = await this.M(Models.UserGroupLink).where({UID: data[auth.Fields.UID]}).select()
        let groups = ugids.length>0? await this.M(Models.UserGroup).where({UGID: {in: ugids}}).select() : []
        return groups
    }
    /**
     * 增加用户组
     * 已知该用户组的父组号名,继承组号
     */
    async addGroup(data:{Title: string, Sort: number, Memo: string}) {
        // let pid = await this.M(Models.UserGroup).where({Title: data['PName']}).getFields('UGID',true)
        // let epid = await this.M(Models.UserGroup).where({Title: data['EName']}).getFields('UGID',true)
        let g = {}
        g['Title'] = data.Title
        g['Sort'] = data.Sort
        g['Memo'] = data.Memo
        g['PUGID'] = 0
        g['EUGID'] = 0
        let group = await this.M(Models.UserGroup).add(g)
        return group
    }

    /**
     * 查询所有用户组
     */
    async findGroups() {
        return await this.M(Models.UserGroup).select()
    }

    /**
     * 查询用户组
     * @param data 
     */
    async findGroup(data: {UGID: number}) {
        return await this.M(Models.UserGroup).where({UGID: data.UGID}).find()
    }

    /**
     * 删除用户组
     */
    async delGroup(data: {UGID: number}) {
        return await this.M(Models.UserGroup).where({UGID: data.UGID}).del()
    }
}