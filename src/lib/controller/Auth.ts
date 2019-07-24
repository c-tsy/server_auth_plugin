import auth from '../../index';
import { Models } from '../iface/models';
// import { MD5 } from '@ctsy/crypto';
import { BController } from '../lib/controller';
// import { hook_check, HookType } from '../utils';
import Users from '../class/Users';
import Account from '../class/Account';
import Pwd from '../class/Pwd';
import UserGroupLink from '../class/UserGroupLink';
import Hook, { HookWhen } from '@ctsy/hook';
export default class AuthController extends BController {
    /**
     * 登陆
     * @param data 
     */
    async login(data) {
        let account = data[auth.Fields.Account];
        let pwd = data[auth.Fields.PWD];
        //需要判断什么情况下必须用户输入验证码或者其他验证方式
        let vcode = data[auth.Fields.VCode];
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.Account.test(account)) {
            throw new Error(auth.Errors.E_ACCOUNT_ERROR)
        }
        // let svcode = await this._session(auth.Fields.VCode);
        // if (svcode && svcode != vcode) {
        //     throw new Error(auth.Errors.E_VCODE);
        // }
        await this._session(auth.Fields.VCode, null);
        await Hook.emit('Auth/login', HookWhen.Before, this._ctx, data);
        // await hook_check(this._ctx, 'Auth', HookType.before, 'login', data)
        let UserAccount = await this.M(Models.Account).where({ Account: account, Status: 1, Type: "PWD" }).find();
        let uid = UserAccount ? UserAccount.UID : 0;
        if (!uid) {
            throw new Error(auth.Errors.E_ACCOUNT_NOT_EXIST);
        }
        if (UserAccount.Status <= 0) {
            throw new Error(auth.Errors.E_ACCOUNT_FORBIDDEN);
        }
        let p = await this.M(Models.Pwd).where({ UID: uid }).getFields('PWD');
        if (!p) {
            throw new Error(auth.Errors.E_PWD_EMPTY);
        }
        if (auth.Crypto.verify(pwd, p)) {
            let [userrs, ugids] = await Promise.all([
                this.M(Models.Users).where({ UID: uid }).find(),
                this.M(Models.UserGroupLink).where({ UID: uid }).getFields('UGID', true),
                this._session('UID', uid),
                // hook_check(this._ctx, 'Auth', HookType.after, 'login', data),
                Hook.emit('Auth/login', HookWhen.After, this._ctx, UserAccount)
            ])
            let group = ugids.length > 0 ? await this.M(Models.UserGroup).where({ UGID: { in: ugids } }).select() : [];
            userrs.UGIDs = ugids;
            userrs.Groups = group;
            userrs.Account = UserAccount;
            let [r] = await Promise.all([
                this._session('User', userrs),
                this._session('UGIDS', ugids),
            ])
            // await this._session('UID', uid);
            // await hook_check(this._ctx, 'Auth', HookType.after, 'login', data)
            //通知外部程序去完成诸如只允许在一个地方登录的问题
            //TODO 将用户的权限及权限组信息写入Session中
            // await this._session('User', user);
            // let user = await this.M(Models.Users).where({ UID: uid }).find()
            // await this._session('User', user);
            let rids = ugids.length > 0 ? await this.M(Models.UserGroupRuleLink).where({ UGID: { in: ugids } }).getFields('RID,U,G,O', true) : []
            let rules = rids.length > 0 ? await this.M(Models.Rule).where({ RID: { in: Object.keys(rids) } }).fields('RID,Title,Rule').select() : []
            let rmap = {}
            for (let i = 0; i < rules.length; i++) {
                rmap[rules[i].Rule] = [rules[i].RID, rules[i].Title, rids[i].U, rids[i].G, rids[i].O]
            }
            await this._session(auth.Fields.Permission, rmap)
            return userrs;
        } else {
            await this._session('UID', undefined);
            throw new Error(auth.Errors.E_PWD_ERROR)
        }
    }
    /**
     * 获取我的权限
     */
    async getPermissions() {
        return await this._session('Persmissions')
    }
    /**
     * 获取登录用户信息
     */
    async info() {
        let UID = await this.checkLogin();
        return await this.M(Models.Users).where({ UID }).find()
    }
    /**
     * 退出登录
     */
    async logout() {
        await this._session('UID', null);
        await this._session('User', null);
        return true;
    }

    /**
     * 允许更换账号
     * @param data 
     */
    async changeAccount(data) {

        let VCode = data[auth.Fields.VCode];
        let SVCode = await this._session(auth.Fields.VCode);
        if (VCode != SVCode) {
            throw new Error(auth.Errors.E_VCODE);
        }

        let UID = await this._session('UID');
        if (UID <= 1) {
            throw new Error(auth.Errors.E_NOT_LOGIN);
        }

        let Account = data.Account;
        if (!Account || !auth.Verify.Account.test(Account)) {
            throw new Error(auth.Errors.E_ACCOUNT_ERROR);
        }
        if (await this.M(Models.Account).where({ Account }).find()) {
            throw new Error(auth.Errors.E_ACCOUNT_EXISTED);
        }
        return !!(await this.M(Models.Account).where({ UID, Type: "PWD" }).limit(1).save({ Account }))
    }
    /**
     * 重新登录
     */
    async relogin() {
        return await this._session('User') || { UID: 0 }
    }
    /**
     * 注册，如何让外部完成检测工作？
     */
    async regist(data) {
        let account: string = data[auth.Fields.Account];
        let pwd = data[auth.Fields.PWD];
        let puid = data[auth.Fields.PUID]
        if (auth.Limit.RegistMustPUID && !puid) {
            throw new Error(auth.Errors.E_NO_PUID)
        }
        if (!auth.Verify.Account.test(account)) {
            throw new Error(auth.Errors.E_ACCOUNT_ERROR)
        }
        //需要判断什么情况下必须用户输入验证码或者其他验证方式
        let vcode = data[auth.Fields.VCode];
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let svcode = await this._session(auth.Fields.VCode);
        if (svcode && svcode != vcode) {
            throw new Error(auth.Errors.E_VCODE);
        }
        if (!svcode && auth.Limit.RegistMustVCode) {
            throw new Error(auth.Errors.E_VCODE)
        }
        await this._session(auth.Fields.VCode, null);
        if (await this.M(Models.Account).where({ Account: account }).getFields('UID')) {
            //账号已被使用
            throw new Error(auth.Errors.E_ACCOUNT_USED);
        }
        /**
         * 检查推介人信息
         */
        if (puid && !await this.M(Models.Users).where({ UID: puid }).getFields('UID')) {
            throw new Error(auth.Errors.E_PUID_NOT_EXIST);
        }
        let lr = await this.M(Models.Levels).where({ UID: puid }).select();
        let reg = new Users();
        reg.Name = data.Name || '匿名'
        reg.Sex = data.Sex || -1
        reg.Nick = data.Nick || '匿名'
        reg.PUID = puid || 1;
        await Hook.emit('Auth/regist', HookWhen.Before, this._ctx, data)
        // let r = await hook_check(this._ctx, 'Auth', HookType.before, 'regist', data)
        // if ('object' == typeof r) {
        //     reg = Object.assign(reg, r);
        // }
        await this.startTrans();
        try {
            let user = await this.M(Models.Users).add(reg);
            if (user.UID > 0) {
                // levels.push({ UID: user.UID, PUID:})
                let ld = [];
                for (let i = 0; i < lr.length; i++) {
                    ld.push({ UID: user.UID, PUID: lr[i].PUID, Level: lr[i].Level });
                }
                ld.push({ UID: user.UID, PUID: puid, Level: lr.length })
                let ac = new Account()
                ac.Account = account;
                ac.UID = user.UID;
                ac.Type = 'PWD';
                ac.Status = 1;
                let upwd = new Pwd();
                upwd.UID = user.UID;
                upwd.PWD = auth.Crypto.encode(pwd);
                let ug = new UserGroupLink()
                ug.UID = user.UID;
                ug.CTime = new Date;
                ug.UGID = auth.Default ? auth.Default.UserGroupID : 1;
                ug.Memo = auth.Default ? auth.Default.UserGroupMemo : '自动分配';
                await Promise.all([
                    this.M(Models.Account).add(ac),
                    this.M(Models.Pwd).add(upwd),
                    this.M(Models.UserGroupLink).add(ug),
                    this.M(Models.Levels).addAll(ld),
                    /**
                     * 注册的时候团队人数+1
                     */
                    this.M(Models.Users).where({ UID: reg.PUID }).incOrDec({ TNum: 1 }),
                ])
                await Hook.emit('Auth/regist', HookWhen.After, this._ctx, user)
                await this.commit()
                return user;
            } else {
                await this.rollback()
                throw new Error(auth.Errors.E_REG_ERROR);
            }
        } catch (error) {
            await this.rollback()
            throw new Error(auth.Errors.E_REG_ERROR);
        } finally {

        }
    }
    /**
     * 忘记密码，通过验证码找回，验证码需要手动逻辑写入到session中用于读取
     * @param data 
     */
    async forget(data) {
        let pwd = data[auth.Fields.PWD];
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let vcode = data[auth.Fields.VCode];
        if (vcode !== await this._session(auth.Fields.VCode)) {
            throw new Error(auth.Errors.E_VCODE);
        }
        await this._session(auth.Fields.VCode, null);
        let account = data[auth.Fields.Account];
        if (!auth.Verify.Account.test(account)) {
            throw new Error(auth.Errors.E_ACCOUNT_ERROR)
        }
        if ('string' != typeof account) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        await Hook.emit('Auth/forget', HookWhen.Before, this._ctx, data)
        // await hook_check(this._ctx, 'Auth', HookType.before, 'forget', data)
        let UID = await this.M(Models.Account).where({ Account: account }).getFields('UID');
        await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) })
        // await hook_check(this._ctx, 'Auth', HookType.after, 'forget', data)
        await Hook.emit('Auth/forget', HookWhen.After, this._ctx, data)
        return true;
    }
    /**
     * 在登陆成功的情况下修改密码需要原密码参与
     * @param data 
     */
    async reset(data) {
        let pwd = data[auth.Fields.PWD];
        let opwd = data[auth.Fields.OldPWD];
        if ('string' != typeof pwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(pwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        if ('string' != typeof opwd) {
            throw new Error(auth.Errors.E_PARAMS)
        }
        if (!auth.Verify.PWD.test(opwd)) {
            throw new Error(auth.Errors.E_PARAMS_FAILD)
        }
        let UID = await this.checkLogin();
        await Hook.emit('Auth/reset', HookWhen.Before, this._ctx, data)
        // await hook_check(this._ctx, 'Auth', HookType.before, 'reset', data)
        let p = await this.M(Models.Pwd).where({ UID }).getFields('PWD');
        if (auth.Crypto.verify(opwd, p)) {
            await this.M(Models.Pwd).where({ UID }).save({ PWD: auth.Crypto.encode(pwd) });
            // await hook_check(this._ctx, 'Auth', HookType.after, 'reset', data)
            await Hook.emit('Auth/reset', HookWhen.After, this._ctx, data)
            return true;
        } else {
            //原始密码错误
            throw new Error(auth.Errors.E_PWD_ERROR)
        }
    }
    /**
     * 管理员重置账户
     * @param data 
     */
    async areset(data) {
        let UID = data.UID;
        if (!(UID > 0)) {
            throw new Error(auth.Errors.E_PARAMS);
        }
        //TODO 检查权限是否存在
        // let loginedUID = await this.checkRule('');

    }
}