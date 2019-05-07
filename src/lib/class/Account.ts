/**
  * 账号 Account
  * 用户编号 UID 大整数(bigint)
  * Account Account 字符50(char(50))
  * 类型 Type 字符50(char(50))
  * 状态 Status 状态值(tinyint(1))
*/
export default class Account{
        
    public UID:number=0;    
    public Account:string="";    
    public Type:string="";    
    public Status:number=1;
}