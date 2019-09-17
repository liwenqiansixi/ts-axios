/*实现所有的请求逻辑
利用 XMLHttpRequest 发送请求
*/
import {AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig):void{
    // 定义了一些默认值
    const {url,
        method='get',
        data=null,} = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}
