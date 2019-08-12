# 服务端用户账户模组 AuthPluin For Server
auth plugin used in server

## 1.导入doc/init.sql 到数据库中
## 2.在启动脚本中添加如下代码用以启用模块
```typescript
//导入服务
import auth from '@ctsy/server_auth_plugin'
//设置密码加密的salt
auth.Crypto.salt = "fwjfwei-2or3fw0-"
//设置账号验证规则，不符合这个规则的将被拒绝
auth.Verify.Account = /^.{5,}/

// 不在需要手动注入模块路径，默认路径为_a
```

## 3.接下来使用形式如下结构的路径完成请求

> http://domain/_a/Auth/login

## 4.客户端请安装 @ctsy/auth-api 包，该包提供了该模块的访问Api封装SDK
```typescript
//客户端部分
import Auth from '@ctsy/auth-api'

Auth.Auth.login("账号","密码");

```
## 5.注意事项

```typescript
//默认的表前缀为auth_，如需编程访问该模块的表请设置ctx的route.Path为模块目录
import AuthModels from '@ctsy/server_auth_plugin/dist/lib/ifaces/models'

this._ctx.route.Path=server._modules['a']
this._prefix="auth_"

await this.M(AuthModels).where().find();

// 或通过controller方法访问将自动处理前缀和模块目录切换问题

import controller from '@ctsy/router'
//使用路由组件中的方法去访问
controller(this._ctx,'_a/Auth/login',{Account:"",PWD:""})

```