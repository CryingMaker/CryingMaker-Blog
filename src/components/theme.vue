<template>
    <div class="theme">
        <n-space>
            <n-switch :value="header.theme" size="medium" :rail-style="railStyle">
                <template #checked-icon>
                    <svg class="icon svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-Sun"></use>
                    </svg>
                </template>
                <template #unchecked-icon>
                    <svg class="icon svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-moon"></use>
                    </svg>
                </template>
            </n-switch>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { useHeaderStore } from '../store';
const header = useHeaderStore();

const railStyle = ({ checked }: { checked: boolean }) => {
    const style: CSSProperties = {};
    if (checked)
        style.background = '#202020'
    else
        style.background = '#FFFFFF'
    return style
}
</script>

<style lang="scss" scoped></style>