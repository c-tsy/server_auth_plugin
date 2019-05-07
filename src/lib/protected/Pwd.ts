import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 密码 Pwd
  * 用户编号 UID 序号(bigint)
  * 用户密码 PWD 字符50(char(50))
*/
export default class Pwd extends CController{
  get _KeywordTable(){
    return 'Pwd'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}