import BaseController from '@ctsy/controller/dist/base_controller';
import { Models } from '../iface/models';
import { BController } from '../lib/controller';
import auth from '../..';
import CertificationLog from '../class/CertificationLog';
import { hook_check, HookType } from '../utils';
export default class Certification extends BController {
    /**
     * 申请认证
     */
    async apply(data) {
        let uid = await this.checkLogin();
        let judage = await this.M(Models.CertificationResult).where({ UID: uid, CID: data.CID }).find();
        if (judage) {
            throw new Error(auth.Errors.E_CERTIFICATED)
        }
        let judaging = await this.M(Models.CertificationLog).where({ UID: uid, CID: data.CID, Result: 0 }).find();
        if (judaging) {
            throw new Error(auth.Errors.E_CERTIFICATING)
        }
        let cl = new CertificationLog()
        cl.UID = uid;
        cl.CID = data.CID;
        cl.Data = data.Data;
        return await this.M(Models.CertificationLog).add(cl)
    }
    /**
     * 审核认证
     */
    async judge(data) {
        let uid = await this.checkLogin();
        if (!data.CLID) { throw new Error(auth.Errors.E_PARAMS) }
        let j = await this.M(Models.CertificationLog).where({ CLID: data.CLID }).find()
        if (!j) { throw new Error(auth.Errors.E_NO_CERTIFICATION) }
        if (j.Result != 0) { throw new Error(auth.Errors.E_JUDGED); }
        await hook_check(this._ctx, 'Certification', HookType.before, 'judge', data);
        try {
            await this.startTrans()
            await Promise.all([
                this.M(Models.CertificationLog).where({ CLID: data.CLID }).save({ JTime: new Date, Result: data.Result, Memo: data.Memo || '' }),
                this.M(Models.CertificationResult).addIfNotExist({ Data: j.Data, CTime: j.CTime, PTime: new Date }, { CID: data.CID, UID: j.UID }),
                hook_check(this._ctx, 'Certification', HookType.after, 'judge', data)
            ])
            await this.commit();
            return true;
        } catch (error) {
            await this.rollback()
            throw error;
        }
    }
    /**
     * 获取认证类型数据
     */
    async gets() { return await this.M(Models.Certification).select() }
}