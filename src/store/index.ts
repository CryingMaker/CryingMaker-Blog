
import { defineStore } from 'pinia'

export const headerStore = defineStore('header', {
    state: () => {
        let index = 0;//nav的index 控制main区域内容
        let theme = 0;//主题切换
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





