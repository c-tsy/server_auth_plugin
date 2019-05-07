import auth from "..";
/**
 * Hook
 */
export enum HookType{
    before = '_before_',
    after = '_after',
}
/**
 * hook检查
 * @param ctx 
 * @param hook 
 * @param where 
 * @param method 
 * @param data 
 */
export async function hook_check(ctx,hook,where:HookType=HookType.before,method,data?) {
    if (auth.Hook[hook] instanceof Function) {
        let h = ''
        if (auth.Hook[hook].constructor) {
            h = new auth.Hook[hook](ctx);
            let m = where+method
            if (h[m] instanceof Function) {
                await h[m](data);
            }
        } else {
            await auth.Hook[hook](data);
        }
    } else {
        return true;
    }
}