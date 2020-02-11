import { DbDataType } from "@ctsy/model";
/**
  * 账号 Account
  * 用户编号 UID 大整数(bigint)
  * Account Account 字符50(char(50))
  * 类型 Type 字符50(char(50))
  * 状态 Status 状态值(tinyint)
*/
export default {    
    UID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Account:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Type:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Status:{
        type:DbDataType.tinyint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:1,
        allowNull:false
    },
}