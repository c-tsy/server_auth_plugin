/**
  * 权限组 RuleGroup
  * RGID RGID 自增序号(bigint)
  * 组名 Title 字符50(char(50))
  * 描述 Memo 字符250(char(250))
  * PRGID PRGID 序号(bigint)
  * 组序 Sort 序号(bigint)
*/
export default class RuleGroup {

  public RGID: number = 0;
  public Title: string = "";
  public Memo: string = "";
  public PRGID: number = 0;
  public Sort: number = 0;
}