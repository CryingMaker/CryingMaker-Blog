<template>
    <div class="theme">
        <div class="switch" :class="{ drak: header.theme }">
            <span>
                <svg class="icon svg-icon" aria-hidden="true" v-show="header.theme">
                    <use xlink:href="#icon-Sun"></use>
                </svg>
                <svg class="icon svg-icon" aria-hidden="true" v-show="!header.theme">
                    <use xlink:href="#icon-moon"></use>
                </svg>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { headerStore } from '../store';
const header = headerStore();

</script>

<style lang="scss" scoped>
.theme {
    cursor: pointer;

    .switch {
        width: 100%;
        height: 100%;
        border: 1px solid $gray-10;
        padding: 5px 30px;
        padding-left: 5px;
        border-radius: 9999px;

        transition: all .2s linear;

        span {
            border-radius: 9999px;
            background-color: $gray-10;
            color: $gray-1;
            padding: 2px;
        }
    }

    .drak {
        padding: 5px 30px;
        padding-right: 5px;
    }
}
</style>