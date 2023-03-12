<template>
    <header class="header">
        <div class="logo">CRYINGMAKER</div>
        <nav class="nav">
            <div :class="{ isActive: header.index == index }" @click="handleNav(index, item.path)"
                v-for="(item, index) in nav" :key="index">{{ item.name }}</div>
        </nav>
        <div class="theme" @click="trigger()">开关</div>

        <div class="more" @click="handleNavList()">
            <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo1"></use>
            </svg>
        </div>
    </header>

    <transition name="modal" mode="out-in">
        <div class="modal" v-show="header.modal" v-if="clientWidth < 1100">
            <MyAsideLeft />
            <div class="line"></div>
            <div class="modal-nav">
                <div :class="{ isActive: header.index == index }" @click="handleNav(index, item.path)"
                    v-for="(item, index) in nav" :key="index">{{ item.name }}</div>
            </div>
            <div class="theme" @click="trigger()">开关</div>
            <!-- <div class="line"></div> -->
            <MyAsideRigth />
        </div>
    </transition>

    <transition name="modal" mode="out-in">
        <div class="mask" v-if="clientWidth < 1100" v-show="header.modal" @click="header.modal = 0"></div>
    </transition>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { headerStore } from '../store';
const header = headerStore();
const router = useRouter();
const route = useRoute();

const nav = [
    { name: '博客', path: 'blog', },
    { name: '留言', path: 'message', },
    { name: '照片', path: 'photo', },
    { name: '友情链接', path: 'link', },
    { name: '关于本站', path: 'about', }
];

//用户点击nav 切换路由
const handleNav = (index: number, path: string) => {
    router.replace(path);
    header.setIndex(index);
}


//获取用户屏幕宽度 如果小于800 那么不加载 modal 模块
let clientWidth = ref<number>(0);
const getWindowResize = () => {
    clientWidth.value = document.body.clientWidth;
}


//切换主题色
const trigger = () => {
    if (header.theme) {
        document.getElementsByTagName('body')[0].style.setProperty('--gray-1', '#202020');
        document.getElementsByTagName('body')[0].style.setProperty('--gray-10', '#FFFFFF');
        header.theme = 0;
    } else {
        document.getElementsByTagName('body')[0].style.setProperty('--gray-1', '#FFFFFF');
        document.getElementsByTagName('body')[0].style.setProperty('--gray-10', '#202020');
        header.theme = 1;
    }
}

//是否显示 modal
const handleNavList = () => {
    header.triggerModal();
}


onMounted(() => {
    //当用户刷新时 从路由的meta中获取当前的navIndex
    header.setIndex(<number>route.meta.index);
    //获取用户设备宽度
    window.addEventListener('resize', getWindowResize)
});

</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all .5s ease-in-out;
    opacity: 1;
    transform: translateX(0%);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translateX(100%);
}


.header {
    width: 100%;
    height: 50px;
    background-color: $gray-1;
    position: fixed;
    top: 0;
    left: 0;
    color: $gray-10;
    backdrop-filter: blur(30px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    z-index: 99999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;

    .logo {
        user-select: none;
        font-size: $size-20;
        letter-spacing: 5px;
        transition: all .2s ease-in-out;
        position: relative;
        overflow: hidden;

        &:hover {
            transform: scale(1.2);

            &::before {
                left: 60%;
                top: 60%;
            }
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            left: -60%;
            top: -60%;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, .5);
            transform: rotate(-45deg);
            z-index: 999;
            transition: all .5s linear;
        }
    }

    .nav {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;

        .isActive {
            font-weight: 600;
            font-size: $size-18;
            transform: scale(1.1);
            background-color: $gray-10;
            color: $gray-1;
            border-radius: 30px;
            padding: 5px 20px;
        }

        div {
            padding: 0px 20px;
            transition: all .1s ease-in;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .theme {
        cursor: pointer;
    }

    .more {
        display: none;
    }
}


.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $gray-10;
    opacity: .5;
    z-index: 999;
}

.modal {
    width: 35%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: $gray-1;
    color: $gray-10;
    z-index: 9999;
    overflow-y: auto;
    padding: 50px 0px;

    .line {
        width: 80%;
        height: 1px;
        margin: 0px auto;
        background-color: $gray-2;
    }

    .modal-nav {
        color: $gray-10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 280px;
        user-select: none;

        .isActive {
            font-weight: 600;
            font-size: $size-16;
            transform: scale(1.1);
            background-color: $gray-10;
            color: $gray-1;
            border-radius: 30px;
            padding: 5px 10px;
        }

        div {
            padding: 0px 20px;
            transition: all .1s ease-in;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .theme {
        height: 50px;
        width: 35%;
        color: $gray-10;
        cursor: pointer;
        position: fixed;
        bottom: 0;
        right: 0px;
        text-align: center;
        background-color: $gray-1;
    }

    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #49b1f5;
        background-image: linear-gradient(45deg, rgba(255, 255, 255, .4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .4) 50%, rgba(255, 255, 255, .4) 75%, transparent 75%, transparent);
    }

    &::-webkit-scrollbar-track {
        background-color: #49b1f533;
        border-radius: 4px;
    }
}

@media screen and (max-width: 1100px) {
    .header {
        justify-content: space-between;

        .nav,
        .theme {
            display: none;
        }

        .more {
            font-size: 22px;
            display: block;
        }


    }
}
</style>