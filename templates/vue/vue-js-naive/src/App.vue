<script setup>
import { computed } from 'vue'
import { darkTheme } from 'naive-ui'
import { usePublicStore } from '/@/store'
import { DarkModeRound, LightModeRound } from '@vicons/material'

const publicStore = usePublicStore()
const toggleTheme = (theme) => publicStore.setTheme(theme)
const theme = computed(() => publicStore.theme)
</script>
<template>
    <n-config-provider :theme="theme === 'dark' ? darkTheme : null">
        <n-layout>
            <div class="root">
                <router-view></router-view>
                <div class="toggle-theme">
                    <n-icon size="50">
                        <template v-if="theme === 'light'">
                            <dark-mode-round @click="toggleTheme('dark')" />
                        </template>
                        <template v-else>
                            <light-mode-round @click="toggleTheme('light')" />
                        </template>
                    </n-icon>
                </div>
            </div>
        </n-layout>
    </n-config-provider>
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
