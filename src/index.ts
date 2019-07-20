import AuthController from "./lib/controller/Auth";
import Configer, { Config } from './config'
import { ModuleConfig } from '@ctsy/server_plugin';
import { Password } from '@ctsy/crypto'
export class Auth extends ModuleConfig {

    Default: {
        UserGroupID: 1,
        UserGroupMemo: ''
    }
    /**
     * 密码Hash盐
     */
    Salt: string = ""
    /**
     * 加密算法类
     */
    Crypto: Password = new Password('');

    /**
     * 字段定义
     */
    Fields = {
        /**
         * 账号
         */
        Account: 'Account',
        /**
         * 密码
         */
        PWD: 'PWD',
        /**
         * 原始密码字段
         */
        OldPWD: 'OldPWD',
        /**
         * 验证码
         */
        VCode: 'VCode',
        /**
         * 权限字段名称
         */
        Permission: 'Permission',
        /**
         * 用户编号
         */
        UID: 'UID',
        /**
         * 推介人
         */
        PUID: 'PUID',
    }

    Limit = {
        /**
         * 注册时必须有推介人？
         */
        RegistMustPUID: false,

        RegistMustVCode: false
    }

    /**
     * 错误提示信息
     */
    Errors = {
        E_NO_PUID: '无推介人',
        E_PARAMS: '参数错误',
        E_ACCOUNT_NOT_EXIST: '账号不存在',
        E_PWD_EMPTY: '密码不存在',
        E_PWD_ERROR: '密码错误',
        E_NOT_LOGIN: '未登录',
        E_PARAMS_FAILD: '参数验证失败',
        E_VCODE: '验证码错误或已过期',
        E_REG_ERROR: '注册失败',
        E_ACCOUNT_USED: '账号已被使用',
        E_CERTIFICATED: '账户已认证',
        E_CERTIFICATING: '请等待认证结果后再申请',
        E_PUID_NOT_EXIST: '推介人不存在',
        E_NO_CERTIFICATION: '无该认证信息',
        E_JUDGED: '该认证已被处理',
        E_ACCOUNT_FORBIDDEN: '账户已被禁用',
        E_ACCOUNT_ERROR: '账号不符合规则',
    }
    Verify = {
        Account: /^[\w\b_-]{5+}$/,
        PWD: /.{6,}/
    }

    Hook: { [index: string]: any } = {
    }
}
const auth = new Auth
export default auth