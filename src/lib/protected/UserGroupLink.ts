import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 用户分组 UserGroupLink
  * UGLID UGLID 自增序号(bigint)
  * 用户编号 UID 大整数(bigint)
  * UGID UGID 大整数(bigint)
  * 分组时间 CTime 时间日期(datetime)
  * 备注 Memo (char(250))
*/
export default class UserGroupLink extends CController{
  get _KeywordTable(){
    return 'UserGroupLink'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}