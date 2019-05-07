import { DbDataType } from "@ctsy/model";
/**
  * 用户 Users
  * 用户编号 UID 大数值自增(bigint)
  * 姓名 Name 字符50(char(50))
  * 昵称 Nick 字符50(char(50))
  * 性别 Sex 状态值(tinyint(1))
  * Status Status 状态值(tinyint(1))
*/
export default {    
    UID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    Name:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Nick:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Sex:{
        type:DbDataType.tinyint(1),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Status:{
        type:DbDataType.tinyint(1),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:1,
        allowNull:false
    },
}