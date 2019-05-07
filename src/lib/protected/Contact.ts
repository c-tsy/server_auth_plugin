import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 联系方式 Contact
  * 用户编号 UID 序号(bigint)
  * 方式 T 字符20(char(20))
  * 值 V 字符50(char(50))
  * 配置 C 字符250(char(250))
*/
export default class Contact extends CController{
  get _KeywordTable(){
    return 'Contact'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}