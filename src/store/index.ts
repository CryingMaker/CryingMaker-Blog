
import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('headerStore', {
    state: () => {
        let index = 0;//nav的index 控制main区域内容
        let theme = false;//主题切换
        let modal = 0;//移动端是否显示导航

        return {
            index,
            theme,
            modal
        }
    },
    actions: {
        setIndex(val: number) {
            this.index = val;
        },
        triggerModal() {
            this.modal = this.modal ? 0 : 1;
        }
    },
    getters: {

    },
});



export const useContentStore = defineStore('contentStore', {
    state: () => {
        //请求数量
        let pageNum = 1;
        let pageSize = 15;

        return {
            pageNum,
            pageSize
        }
    },
    actions: {
        incrementPageNum() {
            this.pageNum++;
        },
        setPageNum(val: number) {
            this.pageNum = val;
        }
    },
    getters: {

    },
});

