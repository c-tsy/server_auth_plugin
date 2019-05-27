import { DbDataType } from "@ctsy/model";
/**
  * 用户层级关系 AuthLevels
  * LID LID 自增序号(bigint)
  * UID UID 序号(bigint)
  * PUID PUID 序号(bigint)
  * Level Level 序号(bigint)
*/
export default {    
    LID:{
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
    PUID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Level:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}