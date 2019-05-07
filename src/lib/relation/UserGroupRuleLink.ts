import Relation, { R } from "@ctsy/relation";
/**
  * 用户组权限 UserGroupRuleLink
  * UGRL UGRL 自增序号(bigint)
  * UGID UGID 序号(bigint)
  * RID RID 序号(bigint)
*/
export default class UserGroupRuleLink extends Relation{    
    constructor(ctx,table){
        super(ctx,table)
    }
}
