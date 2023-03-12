<template>
    <header class="header">
        <div class="logo">CRYINGMAKER</div>
        <nav class="nav">
            <div :class="{ isActive: header.index == index }" @click="handleNav(index, item.path)"
                v-for="(item, index) in nav" :key="index">{{ item.name }}</div>
        </nav>
        <div class="theme" @click="trigger()">开关</div>
    </header>
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

const handleNav = (index: number, path: string) => {
    router.replace(path);
    header.setIndex(index);
}

onMounted(() => {
    header.setIndex(<number>route.meta.index)
});

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


</script>

<style lang="scss" scoped>
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
}

// @media screen and (max-width: 1000px) {}
</style>