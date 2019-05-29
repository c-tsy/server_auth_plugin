import Relation, { R } from "@ctsy/relation";
/**
  * 用户组 UserGroup
  * UGID UGID 自增序号(bigint)
  * 组名 Title 字符50(char(50))
  * 组序 Sort 序号(bigint)
  * 父组号 PUGID 序号(bigint)
  * 备注 Memo 字符50(char(50))
  * 继承组 EUGID 序号(bigint)
*/
export default class UserGroup extends Relation {
}
