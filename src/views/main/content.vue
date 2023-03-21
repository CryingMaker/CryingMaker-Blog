<template>
    <main class="main" ref="main">
        <n-message-provider placement="top" :max="5" :to="center">
            <div class="left">
                <MyAsideLeft />
            </div>

            <div class="center" ref="center">
                <router-view v-slot="{ Component }">
                    <transition name="main" mode="out-in">
                        <keep-alive>
                            <component :is="Component" ref="content" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>

            <div class="rigth">
                <MyAsideRigth @goBackTop="goBackTop" />
            </div>
        </n-message-provider>
    </main>
</template>
 
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();

let main = ref<HTMLElement>();
//内容区域返回顶部
let center = ref<HTMLElement>();
const goBackTop = () => {
    const timer = setInterval(() => {
        if (center.value!.scrollTop <= 0) {
            clearInterval(timer)
        } else {
            center.value?.scrollTo({ left: 0, top: center.value.scrollTop - 50 })
        }
    }, 5)
}

//获取内容元素
let content = ref();

//监视滚动条 根据理由中meta的index加载更多不同的信息
const watchScroll = async () => {
    const scrollTop = center.value!.scrollTop;
    const clientHeigth = center.value!.clientHeight;
    const scrollHeigth = center.value!.scrollHeight;

    if ((scrollTop + clientHeigth + 50) >= scrollHeigth) {
        if (route.meta.index == 0) {
        } else if (route.meta.index == 1) {
            await content.value.getMessage();
        } else if (route.meta.index == 2) {
            await content.value.getPhotos();
        }
    }
}


onMounted(() => {
    center.value!.addEventListener('scroll', watchScroll);
})

</script>

<style lang="scss" scoped>
.main-enter-active,
.main-leave-active {
    transition: all .5s ease-in-out;
    opacity: 1;
}

.main-enter-from,
.main-leave-to {
    opacity: 0;
}

:deep(.n-message-container, .n-message-container--top) {
    top: 60px;
}

.main {
    width: 95%;
    height: 90vh;
    border-radius: 10px;
    margin: 80px auto;
    margin-top: 60px;
    margin-bottom: 0px;
    display: flex;
    padding: 10px 20px;

    .add {
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 20%;
        height: 3%;
        background-color: $gray-10;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        color: $gray-1;
        text-align: center;
        letter-spacing: 3px;
        cursor: pointer;
    }


    .left {
        width: 18%;
    }

    .rigth {
        width: 10%;
    }

    .center {
        width: 72%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: 0px 10px;
        border-radius: 10px;
        background-color: $gray-10;

        &::-webkit-scrollbar {
            width: 7px;
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
}

@media screen and (max-width: 1350px) {
    .rigth {
        display: none;
    }

    .center {
        width: 87% !important;
    }
}

@media screen and (max-width: 1100px) {

    .main {
        width: 100%;
        padding: 0;
        margin-top: 50px;
        border-radius: 0px !important;

        .rigth {
            display: none;
        }

        .left {
            display: none;
        }

        .center {
            width: 100% !important;
            margin: 0 !important;
            border-radius: 0px !important;

            &::-webkit-scrollbar {
                width: 3px;
                height: 5px;
            }
        }
    }


}
</style>