import Relation, { R } from "@ctsy/relation";
/**
  * 用户 Users
  * 用户编号 UID 大数值自增(bigint)
  * 姓名 Name 字符50(char(50))
  * 昵称 Nick 字符50(char(50))
  * 性别 Sex 状态值(tinyint(1))
  * Status Status 状态值(tinyint(1))
*/
export default class Users extends Relation{    
    constructor(ctx,table){
        super(ctx,table)
    }
}
