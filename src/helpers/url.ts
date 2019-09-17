import {isDate, isObject} from './utils'
function encode(val:string):string{
    // 处理特殊字符    
    return encodeURIComponent(val).replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url:string, params?:any): string{
    if(!params){
        return url
    } 
    const parts:string[] = []
    Object.keys(params).forEach((key)=>{
    
        let val = params[key]
        if (val === null || typeof val === 'undefined') {
          return
        }
        let values: string[]
        if (Array.isArray(val)) {
          values = val
          key += '[]'
        } else {
          values = [val]
        }
        values.forEach((val) => {
          if (isDate(val)) {
            val = val.toISOString()
          } else if (isObject(val)) {
            val = JSON.stringify(val)
          }
          parts.push(`${encode(key)}=${encode(val)}`)
        })
    })
    let serializedParams = parts.join('&')
    if(serializedParams){
        // 寻找url中是否有hash的标示
        const markIndex = url.indexOf('#')
        if(markIndex!== -1) {
            url = url.slice(0,markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
    return url
}

//     const val = params[key]
    //     console.log(val)
    //     if(val === null || typeof val ==="undefined"){
    //         // 如果不存在那么直接返回Url
    //         return
    //     }
    //     // 判断是否是一个数组
    //     // foo: ['bar', 'baz'] 解析为?foo[]=bar&foo[]=baz'
    //     let values: string[]
    //     if(Array.isArray(val)){
    //         values = val
    //         key += '[]'
    //     } else {
    //         // 不是一个数组的时候 要统一为一个数组
    //         values = [val]
    //     }
    //     console.log(values)