import { Models } from '../iface/models';
import auth from '../..'
import { BController, CController } from '../lib/controller';
import { array_columns } from 'castle-function'
export default class User extends BController {
    // _prefix = auth.Prefix;
    /**
     * 保存昵称
     * @param param0 
     */
    async save({ Nick }) {
        return await this.M(Models.Users).where({ UID: await this._session('UID') }).save({ Nick });
    }
    /**
     * 获取我的团队信息
     * @param param0 
     */
    // async myteam({ P, N, Type }) {
    //     let uid = await this._session('UID');
    //     if (!uid) {
    //         throw new Error('未登录')
    //     }
    //     P = P || 1;
    //     N = N || 10;
    //     let level = await this.M(Models.Levels).where({ PUID: uid }).order('Level ASC').getFields('Level');
    //     if (undefined === level) {
    //         return {
    //             L: [],
    //             T: 0,
    //             P: P,
    //             N: N,
    //         }
    //     }
    //     let r = await this.M(Models.Levels).where({ PUID: uid, Level: level }).fields('UID').page(P, N).selectAndCount();
    //     return {
    //         L: await this.R(Models.Users).where({ UID: { in: array_columns(r.rows, 'UID') } }).select(),
    //         T: r.count,
    //         P: P,
    //         N: N,
    //     }
    // }
    /**
     * 获取指定成远的团队信息
     * @param param0 
     */
    async myteam({ UID, P, N }) {
        if (!UID) { UID = await this._session('UID'); }
        if (!UID) {
            throw new Error('未指定用户')
        }
        let mine = await this.M(Models.Users).where({ UID }).getFields('TNum');
        return {
            L: await this.R(Models.Users).where({ PUID: UID }).page(P || 1, N || 10).select(),
            P, N, T: mine
        }
    }
}