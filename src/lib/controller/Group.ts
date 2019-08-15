import { CController, BController } from '../lib/controller';
import * as _ from 'lodash';
import { Models } from '../iface/models';
import { array_key_set } from 'castle-function';
const cache: any = {
    // list: [],
    // tree: []
}
/**
 * 用户组操作
 */
export default class Group extends BController {

    /**
     * 获取用户组信息
     */
    async all({ Type }) {
        Type = Type || 'tree';
        if (cache[Type]) {
            return cache[Type];
        }
        let alls = array_key_set(await this.M(Models.UserGroup).fields('UGID,Title,PUGID,Memo').order('UGID,Sort').select(), 'PUGID', true);
        let rs = [];

        let sort = (UGID: number) => {
            if (!alls[UGID]) {
                return;
            }
            for (let x of alls[UGID]) {
                rs.push(x);
                if (alls[x.UGID]) sort(x.UGID);
            }
        };

        for (let x of alls[0]) {
            rs.push(x);
            let UGID = x.UGID;
            sort(UGID);
        }
        cache['list'] = _.cloneDeep(rs);
        let tree = {},
            levels = [];
        for (let x of rs) {
            x.Subs = {};
            if (x.PUGID == 0) {
                tree[x.UGID] = x;
                levels = [];
            } else {
                if (levels[levels.length - 1] != x.PUGID) {
                    if (levels.includes(x.PUGID)) {
                        levels = levels.slice(0, levels.indexOf(x.PUGID) + 1)
                    } else
                        levels.push(x.PUGID);
                }
                // console.log(levels, x.UGID, x.PUGID, tree);
                if (levels.length == 0) {
                    continue;
                }
                let p = tree[levels[0]];
                for (let i = 1; i < levels.length; i++) {
                    let o = levels[i];
                    p = p.Subs[o];
                }
                p.Subs[x.UGID] = x;
            }
        }
        cache['tree'] = tree;
        return cache[Type];
    }
    /**
     * 保存
     * @param param0 
     */
    async save({ UGID, Data }) {
        if (Object.keys(Data).length == 0) { return false; }
        if (!(UGID > 0)) { return false; }
        return await this.M(Models.UserGroup).where({ UGID }).limit(1).save(Data);
    }
    /**
     * 添加
     * @param param0 
     */
    async add({ Title, Memo, Sort, PUGID }) {
        return await this.M(Models.UserGroup).add({ Title, Memo, Sort, PUGID });
    }
    /**
     * 用户分组
     * @param param0 
     */
    async link({ UGID, UIDs }) {
        let existed: number[] = await this.M(Models.UserGroupLink).where({ UGID, UID: { in: UIDs } }).getFields('UID', true) || [];
        let data = [];
        for (let x of UIDs) {
            if (!existed.includes(x)) {
                data.push({ UGID, UID: x });
            }
        }
        if (data.length > 0) {
            await this.M(Models.UserGroupLink).addAll(data);
        }
        return true;
    }
    /**
     * 删除用户分组信息
     * @param param0 
     */
    async unlink({ UGID, UIDs }) {
        return await this.M(Models.UserGroupLink).where({ UGID, UID: { in: UIDs } }).del();
    }
}