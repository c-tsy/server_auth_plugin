/**
  * 用户 Users
  * 用户编号 UID 大数值自增(bigint)
  * 姓名 Name 字符50(char(50))
  * 昵称 Nick 字符50(char(50))
  * 性别 Sex 状态值(tinyint)
  * Status Status 状态值(tinyint)
*/
export default class Users {

  public UID: number = 0;
  public Name: string = "";
  public Nick: string = "";
  public Sex: number = 0;
  public Status: number = 1;
  public Channel = '';
  public PUID: number = 1;
  public TNum: number = 1;
}