import { Models } from '../iface/models';
import auth from '../..'
import { BController } from '../lib/controller';
import { array_columns } from 'castle-function'
export default class User extends BController {
    /**
     * 获取我的团队信息
     * @param param0 
     */
    async myteam({ P, N, Type }) {
        let uid = await this._session('UID');
        if (!uid) {
            throw new Error('未登录')
        }
        P = P || 1;
        N = N || 10;
        let level = await this.M(Models.Levels).where({ PUID: uid }).order('Level ASC').getFields('Level');
        if (!level) {
            return {
                L: [],
                T: 0,
                P: P,
                N: N,
            }
        }
        let r = await this.M(Models.Levels).where({ PUID: uid, Level: level }).fields('UID').page(P, N).selectAndCount();
        return {
            L: await this.M(Models.Users).where({ UID: { in: array_columns(r.rows, 'UID') } }).select(),
            T: r.count,
            P: P,
            N: N,
        }
    }
}