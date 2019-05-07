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
    Crypto: typeof Password = Password;

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
        E_PWD_ERROR:'密码错误'
    }
}
const auth = new Auth
export default auth