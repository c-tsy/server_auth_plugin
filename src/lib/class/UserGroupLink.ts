/**
  * 用户分组 UserGroupLink
  * UGLID UGLID 自增序号(bigint)
  * 用户编号 UID 大整数(bigint)
  * UGID UGID 大整数(bigint)
  * 分组时间 CTime 时间日期(datetime)
  * 备注 Memo (char(250))
*/
export default class UserGroupLink {

  public UGLID: number = 0;
  public UID: number = 0;
  public UGID: number = 0;
  public CTime: Date = new Date;
  public Memo: string = "";
}