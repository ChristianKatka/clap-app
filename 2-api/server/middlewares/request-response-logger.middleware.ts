import { Context, Next } from 'koa'

export const logRequestAndResponse = async (ctx: Context, next: Next) => {

    console.log("Request\n" + JSON.stringify({
        method: ctx.request.method,
        url: ctx.request.url,
        headers: ctx.request.headers || {},
        query: ctx.request.query || {},
        body: ctx.request.body || {}
    }, null, 4))

    await next()
    
    console.log("Response\n" + JSON.stringify({
        statusCode: ctx.response.status,
        statusMessage: ctx.response.message,
        headers: ctx.response.headers || {},
        body: ctx.response.body || {}
    }, null, 4))
    
}