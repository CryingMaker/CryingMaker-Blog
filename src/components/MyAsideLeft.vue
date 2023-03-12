<template>
    <aside class="aside">
        <div class="avater">
            <div class="avater-img"><img src="../assets/images/ali.jpg" alt="随波逐流"></div>
            <div class="avater-text">随波逐流. . . </div>
        </div>

        <div class="info">
            <div v-for="(item, index) in info" :key="index"><span>{{ item.title }}: </span>{{ item.desc }}</div>
        </div>

        <div class="tags">
            <div class="title">标签</div>
            <div class="list">
                <div v-for="(item, index) in tags" :key="item">{{ item }}</div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
const info = [
    {
        title: 'QQ',
        desc: '1078156056'
    },
    {
        title: '邮箱',
        desc: '1078156056@qq.com'
    },
    {
        title: '地址',
        desc: '湖北 武汉'
    },
    {
        title: '爱好',
        desc: '唱 跳 RAP'
    }
]

const tags = ['APEX', 'CSGO', '生化危机3', '生化危机2', '古墓丽影:暗影', '古墓丽影:崛起', '消逝的光芒'];
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

        span {
            user-select: none;
        }
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
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-top: 5px;

            div {
                padding: 5px 10px;
                padding-left: 0px;
                font-size: $size-14;
            }
        }
    }
}
</style>