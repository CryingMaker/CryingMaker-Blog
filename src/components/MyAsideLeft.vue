<template>
    <aside class="aside">
        <div class="avater">
            <div class="avater-img"><img src="../assets/images/ali.jpg" alt="随波逐流"></div>
            <div class="avater-text">随波逐流. . . </div>
        </div>

        <div class="info">
            <n-gradient-text :gradient="color[Math.floor(Math.random() * color.length)]" v-for="(item, index) in info"
                :key="index">
                <span>{{ item.title }}: </span>{{ item.desc }}
            </n-gradient-text>
        </div>

        <div class="tags">
            <div class="title">标签</div>
            <div class="list">
                <n-tag :bordered="false" :type="getType()" :size="size()" v-for="(item, index) in tags" :key="item">{{ item
                }}</n-tag>
            </div>
        </div>

        <div class="nums">
            <div>
                <p class="subtitle">文章</p>
                <p class="total">
                    <n-number-animation ref="blogNum" :show-separator="false" :from="0" :to="article" :active="true" />
                </p>
            </div>
            <div>
                <p class="subtitle">留言</p>
                <p class="total">
                    <n-number-animation ref="messageNum" :show-separator="false" :from="0" :to="message" :active="true" />
                </p>
            </div>
            <div>
                <p class="subtitle">照片</p>
                <p class="total">
                    <n-number-animation ref="photoNum" :show-separator="false" :from="0" :to="photo" :active="true" />
                </p>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import { getMessageCount } from '../api/message';
import { getPhotoCount } from '../api/photo';
import { color, info, tags } from '../constant'

const articleNum = ref();
const photoNum = ref();
const messageNum = ref();

const article = ref<number>(0);
const photo = ref<number>(0);
const message = ref<number>(0);


type tagType = "error" | "primary" | "info" | "success" | "warning";
const getType = (): tagType => {
    const tagTypes: tagType[] = ["error", "primary", "info", "success", "warning"];
    const randomIndex = Math.floor(Math.random() * tagTypes.length);
    return tagTypes[randomIndex];
}

type sizeType = "small" | "medium" | "large";
const size = (): sizeType => {
    const sizes: sizeType[] = ["small", "medium", "large"];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
}


onMounted(async () => {
    article.value = await getMessageCount();
    message.value = await getMessageCount();
    photo.value = await getPhotoCount();
})




</script>

<style lang="scss" scoped>
@media screen and (max-width: 1100px) {

    .aside {
        padding: 10px 5px !important;
        background-color: $gray-1 !important;
        color: $gray-10 !important;
        position: relative;
    }

    .avater {
        height: 120px !important;

        .avater-img {
            width: 80px !important;
            height: 80px !important;
        }

        .avater-text {
            height: 20%;
            font-size: $size-20;
        }
    }

    .info,
    .tags {
        display: none !important;
    }

    .nums {
        justify-content: space-evenly !important;

        p {
            font-size: $size-16 !important;
        }

        .total {
            font-size: $size-14 !important;
        }
    }

}

.aside {
    width: 100%;
    border-radius: 10px;
    background-color: $gray-10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 20px 15px;
    color: $gray-1;

    .nums {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        text-align: center;
        user-select: none;


        p {
            font-size: $size-20;
        }

        .subtitle {
            border-bottom: 1px solid $gray-1;
        }

        .total {
            font-size: $size-18;
        }

    }

    .avater {
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        font-size: 30px;

        .avater-img {
            width: 100px;
            height: 100px;
            border-radius: 9999px;
            overflow: hidden;
            transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            user-select: none;

            &:hover {
                transform: scale(1.2);
                box-shadow: rgba(0, 0, 0, .5) 0px 25px 50px -12px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .avater-text {
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
        }


    }

    .info {
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-direction: column;
        font-size: $size-18;
        margin-top: 20px;
    }

    .tags {
        width: 100%;
        margin-top: 20px;
        user-select: none;

        .title,
        .list {
            width: 100%;
        }

        .title {
            font-size: $size-18;
        }

        .list {

            div {
                margin: 5px 10px;
                margin-left: 0px;
                font-size: $size-14;
            }
        }
    }
}
</style>