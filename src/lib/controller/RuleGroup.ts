import Controller from '@ctsy/controller/dist/controller'
import { CController } from '../lib/controller';
/**
  * 权限组 RuleGroup
  * RGID RGID 自增序号(bigint)
  * 组名 Title 字符50(char(50))
  * 描述 Memo 字符250(char(250))
  * PRGID PRGID 序号(bigint)
  * 组序 Sort 序号(bigint)
*/
export default class RuleGroup extends CController{
  get _KeywordTable(){
    return 'RuleGroup'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}