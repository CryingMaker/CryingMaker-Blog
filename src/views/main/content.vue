<template>
    <main class="main">
        <div class="left">
            <MyAsideLeft />
        </div>
        <div class="center">
            <router-view v-slot="{ Component }">
                <transition name="main" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="rigth">
            <MyAsideRigth />
        </div>
    </main>
</template>
 
<script lang="ts" setup>

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

.main {
    width: 95%;
    max-height: 870px;
    border-radius: 10px;
    margin: 80px auto;
    margin-top: 60px;
    margin-bottom: 0px;
    display: flex;
    padding: 10px 20px;
    overflow: hidden;

    .left {
        width: 18%;
    }

    .rigth {
        width: 10%;
    }

    .center {
        width: 72%;
        min-height: 800px;
        overflow-y: auto;
        margin: 0px 10px;
        border-radius: 10px;
        background-color: $gray-10;

        &::-webkit-scrollbar {
            width: 10px;
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