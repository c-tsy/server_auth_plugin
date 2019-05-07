import { DbDataType } from "@ctsy/model";
/**
  * 密码 Pwd
  * 用户编号 UID 序号(bigint)
  * 用户密码 PWD 字符50(char(50))
*/
export default {    
    UID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    PWD:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },
}