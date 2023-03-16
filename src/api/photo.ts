
import Request from './request'


// 创建一个 axios 实例，配置相关属性
// 不同的实例可以配置不同的基准属性
const requestInstance = new Request({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 5000
})


export const getMessageCount = async (): Promise<number> => {
    let { result } = await requestInstance.request({
        method: 'GET',
        url: '/message/messageCount'
    })
    return result.count;
}

