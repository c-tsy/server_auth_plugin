import { DbDataType } from "@ctsy/model";
/**
  * 用户分组 UserGroupLink
  * UGLID UGLID 自增序号(bigint)
  * 用户编号 UID 大整数(bigint)
  * UGID UGID 大整数(bigint)
  * 分组时间 CTime 时间日期(datetime)
  * 备注 Memo (char(250))
*/
export default {    
    UGLID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    UID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    UGID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    CTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    Memo:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },
}