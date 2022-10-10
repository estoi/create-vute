<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
    <el-config-provider>
        <div class="root">
            <router-view></router-view>
            <div class="toggle-theme">
                <el-icon :size="50">
                    <template v-if="!isDark">
                        <i-ep-moon @click="toggleDark()" />
                    </template>
                    <template v-else>
                        <i-ep-sunny @click="toggleDark()" />
                    </template>
                </el-icon>
            </div>
        </div>
    </el-config-provider>
</template>
<style lang="less" scoped>
.root {
    width: 100vw;
    height: 100vh;

    .toggle-theme {
        position: fixed;
        z-index: +1;
        right: 20px;
        bottom: 20px;
        border-radius: 50%;
        // background-color: #fff;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
}
</style>
