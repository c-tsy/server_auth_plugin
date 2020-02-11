import { DbDataType } from "@ctsy/model";
/**
  * 实名认证记录 AuthCertificationLog
  * CLID CLID 自增序号(bigint)
  * 认证编号 CID 序号(bigint)
  * UID UID 序号(bigint)
  * 申请时间 CTime 时间日期(datetime)
  * 申请数据 Data 字符250(char(250))
  * 审核结果 Result 状态值(tinyint)
  * 审核时间 JTime 时间日期(datetime)
  * 审核备注 Memo 字符250(char(250))
*/
export default {    
    CLID:{
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
    Data:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Result:{
        type:DbDataType.tinyint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    JTime:{
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