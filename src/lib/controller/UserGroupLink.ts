import { Models } from "../iface/models"
import auth from '../..'
import { BController } from '../lib/controller';
export default class UserGroupLink extends BController{
    /**
     * 增加用户组权限
     * 
     */
    async addUserLink(data:{UID: number, UGID: number,Memo: string}) {
        let g = {}
        g['UGID'] = data.UGID
        g['UID'] = data.UID
        g['CTime'] = new Date()
        g['Memo'] = data.Memo
        return await this.M(Models.UserGroupLink).add(g)
    }

    /**
     * 查询用户所在组
     */
    async findUserGroup(data: {UID: number}) {
        let ugids = await this.M(Models.UserGroupLink).where({UID: data.UID}).fields('UGID').select()
        return ugids.length > 0 ? await this.M(Models.UserGroup).where({UGID: {in: ugids}}).select():[]
    }

    /**
     * 删除用户组某组
     */
    async delUserLink(data: {UID: number, UGID: number}) {
        return await this.M(Models.UserGroupLink).where({UID: data.UID, UGID: data.UGID}).del()
    }

    /**
     * 删除用户全部组
     */
    async delUserLinks(data: {UID: number}) {
        return await this.M(Models.UserGroupLink).where({UID: data.UID}).del()
    }
}