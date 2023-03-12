
import { defineStore } from 'pinia'

export const headerStore = defineStore('header', {
    state: () => {
        let index = 0;//nav的index
        let theme = 0;//主题切换

        return {
            index,
            theme
        }
    },
    actions: {
        setIndex(val: number) {
            this.index = val;
        }
    },
    getters: {

    },
});





