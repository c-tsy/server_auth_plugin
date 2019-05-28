/**
  * 实名认证记录 AuthCertificationLog
  * CLID CLID 自增序号(bigint)
  * 认证编号 CID 序号(bigint)
  * UID UID 序号(bigint)
  * 申请时间 CTime 时间日期(datetime)
  * 申请数据 Data 字符250(char(250))
  * 审核结果 Result 状态值(tinyint(1))
  * 审核时间 JTime 时间日期(datetime)
  * 审核备注 Memo 字符250(char(250))
*/
export default class CertificationLog {
    public CLID: number = 0;
    public CID: number = 0;
    public UID: number = 0;
    public CTime: Date = new Date;
    public Data: string = "";
    public Result: number = 0;
    public JTime: Date = new Date;
    public Memo: string = "";
}