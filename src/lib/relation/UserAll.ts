import Relation, { R } from "@ctsy/relation";
/**
  * 用户 Users
  * 用户编号 UID 大数值自增(bigint)
  * 姓名 Name 字符50(char(50))
  * 昵称 Nick 字符50(char(50))
  * 性别 Sex 状态值(tinyint)
  * Status Status 状态值(tinyint)
*/
export default class UserAll extends Relation {
    constructor(ctx) {
        super(ctx, 'Users')
        // this.h
    }
}
