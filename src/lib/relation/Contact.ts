import Relation, { R } from "@ctsy/relation";
/**
  * 联系方式 Contact
  * 用户编号 UID 序号(bigint)
  * 方式 T 字符20(char(20))
  * 值 V 字符50(char(50))
  * 配置 C 字符250(char(250))
*/
export default class Contact extends Relation{    
    constructor(ctx,table){
        super(ctx,table)
    }
}
