/**
  * 权限 Rule
  * RID RID 自增序号(bigint)
  * RGID RGID 序号(bigint)
  * 权限名称 Title 字符50(char(50))
  * 类型 Type 字符20(char(20))
  * 规则 Rule 字符250(char(250))
  * 备注 Memo 字符250(char(250))
  * 排序 Sort 序号(bigint)
*/
export default class Rule {

  public RID: number = 0;
  public RGID: number = 0;
  public Title: string = "";
  public Type: string = "";
  public Rule: string = "";
  public Memo: string = "";
  public Sort: number = 0;
}