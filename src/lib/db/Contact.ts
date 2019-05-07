import { DbDataType } from "@ctsy/model";
/**
  * 联系方式 Contact
  * 用户编号 UID 序号(bigint)
  * 方式 T 字符20(char(20))
  * 值 V 字符50(char(50))
  * 配置 C 字符250(char(250))
*/
export default {    
    UID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    T:{
        type:DbDataType.char(20),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    V:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    C:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },
}