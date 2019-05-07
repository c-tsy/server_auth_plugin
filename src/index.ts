import AuthController from "./lib/controller/Auth";
import Configer, { Config } from './config'
import { ModuleConfig } from '@ctsy/server_plugin';
import { Password } from '@ctsy/crypto'
export class Auth extends ModuleConfig {
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
        OldPWD:'OldPWD',
        /**
         * 验证码
         */
        VCode: 'VCode',
    }
    /**
     * 错误提示信息
     */
    Errors = {
        E_PARAMS: '参数错误',
        E_ACCOUNT_NOT_EXIST: '账号不存在',
        E_PWD_EMPTY: '密码不存在',
        E_PWD_ERROR: '密码错误',
        E_NOT_LOGIN: '未登录',
        E_PARAMS_FAILD: '参数验证失败',
        E_VCODE:'验证码错误或已过期'
    }
    Verify = {
        PWD:/[\w\b]{6,}/
    }
}
const auth = new Auth
export default auth