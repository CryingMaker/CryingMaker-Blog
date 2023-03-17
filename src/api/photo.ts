

import Request from './request'
import { photoData } from '../types';

export const getToken = async (): Promise<string> => {
    let { data } = await Request.get('/photo/token')
    return data.result.token;
}


export const getPhotoCount = async (): Promise<number> => {
    let { data } = await Request.get('/photo/counter')
    return data.result.count;
}

export const getPhoto = async (pageNum: number, pageSize: number): Promise<photoData[]> => {
    let { data } = await Request.post('/photo/findPhoto', { pageNum, pageSize })
    return data.result.list;
}

export const sendPhoto = async (photo: photoData) => {
    let { data } = await Request.post('/photo', photo)
    return data.result;
}

