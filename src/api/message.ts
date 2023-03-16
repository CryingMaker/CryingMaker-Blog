
import Request from './request'

import { messageData } from '../types'

export const getMessageCount = async (): Promise<number> => {
    let { data } = await Request.get('/message/messageCount')
    return data.result.count;
}

export const getMessages = async (pageNum: number, pageSize: number): Promise<messageData[]> => {
    let { data } = await Request.post('/message/findMessage', { pageNum, pageSize })
    return data.result.list;
}


export const sendMessage = async (message: messageData) => {
    let { data } = await Request.post('/message', message)
    return data.result;
}







