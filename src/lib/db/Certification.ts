import { DbDataType } from "@ctsy/model";
/**
  * 认证 AuthCertification
  * 认证编号 CID 自增序号(bigint)
  * 认证名称 Name 字符50(char(50))
  * 代码 Code 字符50(char(50))
  * Icon Icon 字符50(char(50))
*/
export default {    
    CID:{
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
    Code:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Icon:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },
}