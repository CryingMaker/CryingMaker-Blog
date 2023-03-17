
import Request from './request'

import { linkData } from '../types'


export const getLinkCount = async (): Promise<number> => {
    let { data } = await Request.get('/link')
    return data.result.count;
}

export const getLink = async (pageNum: number, pageSize: number): Promise<linkData[]> => {
    let { data } = await Request.post('/link/getLink', { pageNum, pageSize })
    return data.result.list;
}







