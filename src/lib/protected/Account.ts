import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 账号 Account
  * 用户编号 UID 大整数(bigint)
  * Account Account 字符50(char(50))
  * 类型 Type 字符50(char(50))
  * 状态 Status 状态值(tinyint)
*/
export default class Account extends CController{
  get _KeywordTable(){
    return 'Account'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}