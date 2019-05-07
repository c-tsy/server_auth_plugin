import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 用户组权限 UserGroupRuleLink
  * UGRL UGRL 自增序号(bigint)
  * UGID UGID 序号(bigint)
  * RID RID 序号(bigint)
*/
export default class UserGroupRuleLink extends CController{
  get _KeywordTable(){
    return 'UserGroupRuleLink'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}