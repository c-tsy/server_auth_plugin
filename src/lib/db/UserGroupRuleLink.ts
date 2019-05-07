import { DbDataType } from "@ctsy/model";
/**
  * 用户组权限 UserGroupRuleLink
  * UGRL UGRL 自增序号(bigint)
  * UGID UGID 序号(bigint)
  * RID RID 序号(bigint)
*/
export default {    
    UGRL:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
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
    RID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}