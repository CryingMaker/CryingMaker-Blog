<template>
    <div class="friendLink">
        <a :href="item.url" class="item" v-for="(item, index) in linkList" :key="index">
            <div class="image">
                <img :src="item.imageUrl" class="img">
            </div>
            <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="subTitle">{{ item.subTitle }}</div>
            </div>
        </a>
    </div>
</template>

<script lang="ts" setup>
import { getLink } from '../../api/link';
import { linkData } from '../../types';
import { useContentStore } from '../../store/index';
import { useMessage } from 'naive-ui';
const message = useMessage();
const contentStore = useContentStore();

let linkList = ref<Array<linkData>>([]);

const getLinks = async () => {
    try {
        let res = await getLink(contentStore.pageNum, contentStore.pageSize);
        linkList.value = linkList.value.concat(...res);
    } catch (error) {
        message.error(error as string)
    }
}


onMounted(async () => {
    await getLinks();
})


</script>

<style lang="scss" scoped>
@media screen and (max-width:1100px) {
    .friendLink {
        column-count: 1 !important;

        .item {
            height: 120px !important;
        }

        .image {
            .img {
                width: 90px !important;
                height: 90px !important;
                box-shadow: none !important;
            }
        }
    }
}

.friendLink {
    width: 95%;
    padding: 20px 10px;
    margin: 0px auto;
    column-count: 2;

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        border-radius: 10px;
        transition: all .5s linear;
        font-size: $size-14;
        background-color: $gray-1;
        color: $gray-10;
        height: 100px;
        margin-bottom: 30px;

        &:hover {
            animation: card 1s cubic-bezier(0.315, 0.605, 0.375, 0.925) 0s 1 forwards alternate;
            filter: brightness(1.05);
        }

        .image {
            width: 40%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;


            .img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 50%;
                box-shadow: $gray-10 0px 50px 100px -20px, $gray-10 0px 30px 60px -30px;
            }
        }

        .info {
            height: 100%;
            width: 60%;

            .title {
                font-size: $size-20;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .subTitle {
                font-size: $size-12;
            }
        }
    }
}
</style>