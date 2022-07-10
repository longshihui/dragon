<template>
    <NLayout id="dragon-app">
        <DragonHeader />
        <NLayout
            id="dragon-app-main"
            position="absolute"
            style="top: 64px"
            :native-scrollbar="false"
        >
            <router-view></router-view>
        </NLayout>
    </NLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NLayout } from 'naive-ui';
import DragonHeader from './components/DragonHeader.vue';
import DragonModuleStore from './components/DragonModuleStore.vue';

export default defineComponent({
    components: {
        NLayout,
        DragonHeader,
        DragonModuleStore
    }
});
</script>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
}
</style>

<style scoped>
#dragon-app {
    width: 100%;
    height: 100%;
    position: relative;
}

#dragon-app-main {
    padding: 12px 24px;
    top: 64px;
}
</style>
