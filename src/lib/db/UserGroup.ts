import { DbDataType } from "@ctsy/model";
/**
  * 用户组 UserGroup
  * UGID UGID 自增序号(bigint)
  * 组名 Title 字符50(char(50))
  * 组序 Sort 序号(bigint)
  * 父组号 PUGID 序号(bigint)
  * 备注 Memo 字符50(char(50))
  * 继承组 EUGID 序号(bigint)
*/
export default {    
    UGID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    Title:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Sort:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    PUGID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Memo:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    EUGID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}