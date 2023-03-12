<template>
    <aside class="aside">
        <div class="links">
            <a href="https://space.bilibili.com/357764065?spm_id_from=333.1007.0.0" class="link">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-blibli"></use>
                </svg>
                <span>哔哩哔哩</span>
            </a>

            <a href="https://github.com/CryingMaker" class="link">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-githubb"></use>
                </svg>
                <span>GitHub</span>
            </a>
            <a href="https://www.kugou.com/" class="link">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-kugou1"></use>
                </svg>
                <span>酷狗</span>
            </a>
            <a href="https://music.163.com/#/user/home?id=2013915893" class="link">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wangyiyun"></use>
                </svg>
                <span>网易云</span>
            </a>
            <a href="https://gitee.com/CryingMaker" class="link">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mayun"></use>
                </svg>
                <span>码云</span>
            </a>
        </div>

        <div class="website-info">
            <p>备案/许可证: <br> <a href="javasrcipt:#">鄂ICP备xxxxxxx号</a></p>
            <p>网站备案/许可证: <br> <a href="javasrcipt:#">鄂ICP备xxxxxxx号</a></p>
        </div>
    </aside>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.aside {
    width: 100%;
    border-radius: 10px;
    background-color: $gray-10;
    top: 80px;
    left: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 20px 15px;
    color: $gray-1;

    .links {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .link {
            width: 100%;
            padding: 10px 10px;
            margin: 5px 0px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 10px;
            transition: all .2s ease-in-out;
            user-select: none;

            &:hover {
                color: $gray-10;
                background-color: $gray-1;
            }

            span {
                padding-left: 20px;
            }

            .icon {
                font-size: 30px;
            }
        }


    }

    .website-info {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 3px 0px;
        font-size: $size-14;
        margin-top: 10px;

        a {
            &:hover {
                font-weight: 600;
            }
        }
    }

}
</style>