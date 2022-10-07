<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
const changeTheme = (value) => console.log(value)
</script>
<template>
    <a-config-provider>
        <div class="root">
            <router-view></router-view>
            <a-switch
                v-model:checked="checked"
                checked-children="绿"
                un-checked-children="黄"
                @change="changeTheme"
            />
        </div>
    </a-config-provider>
</template>
<style lang="less" scoped>
.root {
    width: 100vw;
    height: 100vh;
}
</style>
