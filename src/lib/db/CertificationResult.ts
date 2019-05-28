import { DbDataType } from "@ctsy/model";
/**
  * 认证结果 AuthCertificationResult
  * CRID CRID 自增序号(bigint)
  * 认证编号 CID 序号(bigint)
  * UID UID 序号(bigint)
  * 申请时间 CTime 时间日期(datetime)
  * 通过时间 PTime 时间日期(datetime)
  * 数据内容 Data 字符250(char(250))
*/
export default {    
    CRID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    CID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
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
    CTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    PTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    Data:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },
}