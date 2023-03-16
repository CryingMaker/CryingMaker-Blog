<template>
    <div class="blog">
        <n-carousel effect="custom" dot-type="line" trigger="hover" :show-arrow="false"
            :transition-props="{ name: 'creative' }" :interval="2000" :mousewheel="true" dotPlacement="bottom"
            class="carousel">
            <img class="carousel-img" :src="item" v-for="(item, index) in data.carousel_img" :key="index">
        </n-carousel>

        <div class="item" v-for="(item, index) in data.blog_item" :key="index">
            <div class="image">
                <img :src="item.image">
            </div>
            <div class="content">
                <div class="title">{{ item.title }}</div>
                <div class="publish-time">发布时间:{{ item.pulishTime }}</div>
                <div class="subtitle">{{ item.subTitle }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { blogData } from '../../types';

//临时数据
const data: blogData = {
    carousel_img: [
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
    ],
    blog_item: [
        { image: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg', title: 'titles', pulishTime: '2023/10/10', subTitle: 'text' },
        { image: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg', title: 'titles', pulishTime: '2023/10/10', subTitle: 'text' },
        { image: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg', title: 'titles', pulishTime: '2023/10/10', subTitle: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext' },
        { image: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg', title: 'titles', pulishTime: '2023/10/10', subTitle: 'text' },
        { image: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg', title: 'titles', pulishTime: '2023/10/10', subTitle: 'text' },
    ],
}


</script>

<style lang="scss" scoped>
@media screen and (max-width: 1100px) {

    .item {
        height: 200px !important;


        .image {
            width: 40% !important;
        }

        .content {
            width: 60% !important;
        }

        .content {
            padding: 0px !important;
            padding-left: 10px !important;

            .title {
                font-size: 20px !important;
            }

            .publish-time {
                font-size: $size-16 !important;
            }

            .subtitle {
                font-size: $size-12 !important;

            }
        }
    }
}

.blog {
    width: 100%;
    padding: 20px 10px;

    .carousel {
        width: 95%;
        height: 300px;
        margin: 0px auto;
        border-radius: 10px;

        .carousel-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        :deep(.creative-enter-from),
        :deep(.creative-leave-to) {
            opacity: 0;
            transform: scale(0.8);
        }

        :deep(.creative-enter-active),
        :deep(.creative-leave-active) {
            transition: all 0.3s ease;
        }
    }

    .item {
        background-color: $gray-1;
        width: 90%;
        height: 250px;
        border-radius: 10px;
        margin: 30px auto;
        display: flex;
        justify-content: space-between;
        overflow: hidden;

        &:hover {
            border-radius: 20px;
            animation: card .8s cubic-bezier(0.315, 0.605, 0.375, 0.925) 0s 1 forwards alternate;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
        }

        &:hover .image {
            transform: translateX(-20px);
            transform: scale(1);
        }

        .image,
        .content {
            height: 100%;
        }

        .image {
            width: 35%;
            transition: all .2s linear;
            clip-path: polygon(0 0, 88% 0, 100% 100%, 0 100%);
            transform: scale(1.1);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &:nth-child(odd) {
            flex-direction: row-reverse;

            .image {
                clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
            }

            &:hover {
                animation: card-reverse .8s cubic-bezier(0.315, 0.605, 0.375, 0.925) 0s 1 forwards alternate;
            }

            &:hover .image {
                transform: translateX(20px) !important;
            }
        }

        .content {
            width: 65%;
            display: flex;
            justify-content: space-evenly;
            align-items: flex-start;
            flex-direction: column;
            color: $gray-10;
            padding: 0px 20px;

            .title {
                font-size: 40px;
            }

            .publish-time {
                font-size: $size-20;
            }

            .subtitle {
                font-size: $size-18;
                max-height: 80px;
                overflow: hidden;
                -webkit-line-clamp: 2;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }

    }
}
</style>