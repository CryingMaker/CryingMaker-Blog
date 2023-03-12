<template>
    <div class="item">
        <div class="image">
            <img src="../assets/images/ali.jpg">
        </div>
        <div class="content">
            <div class="title">这里是标题</div>
            <div class="publish-time">发布时间:2023-10-12</div>
            <div class="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea expedita atque itaque minus
                reprehenderit veniam fugiat vel quia tempore recusandae iure illo neque modi dolorem sequi, beatae ipsam
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@media screen and (max-width: 1100px) {
    .item {
        height: 200px !important;
    }

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

.item {
    background-color: $gray-1;
    width: 95%;
    height: 300px;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    &:hover .image {
        transform: translateX(-20px);
    }


    .image,
    .content {
        height: 100%;
    }

    .image {
        width: 35%;
        transition: all .2s linear;
        clip-path: polygon(0 0, 88% 0, 100% 100%, 0 100%);



        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
        }
    }

}
</style>