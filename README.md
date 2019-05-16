# server_auth_plugin
auth plugin used in server

```typescript
//导入服务
import server from '@ctsy/server'
//注册模块路径
server.module('a', 'node_modules/@ctsy/server_auth_plugin/dist/lib')
```

接下来使用形式如下结构的路径完成请求

> http://domain/_a/Auth/login