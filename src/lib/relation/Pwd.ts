import Relation, { R } from "@ctsy/relation";
/**
  * 密码 Pwd
  * 用户编号 UID 序号(bigint)
  * 用户密码 PWD 字符50(char(50))
*/
export default class Pwd extends Relation{    
    constructor(ctx,table){
        super(ctx,table)
    }
}
