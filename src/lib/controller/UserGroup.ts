import { BController } from '../lib/controller';
import { Models } from '../iface/models';
import { array_key_set } from 'castle-function';
import * as _ from 'lodash';
const cache: any = {
    // list: [],
    // tree: []
}
export default class UserGroup extends BController {
    /**
     * 获取用户组信息
     */
    async all({ Type }) {
        Type = Type || 'tree';
        if (cache[Type]) {
            return cache[Type];
        }
        let alls = array_key_set(await this.M(Models.UserGroup).fields('UGID,Title,PUGID,Sort,Memo').order('UGID,Sort').select(), 'PUGID', true);
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
    async link() { }
    async unlink() { }
}