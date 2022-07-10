<template>
    <div :class="$style['store']">
        <template v-if="modules.length">
            <NGrid :x-gap="12" :y-gap="8" :cols="4">
                <NGridItem
                    v-for="dragonModule of modules"
                    :key="dragonModule.id"
                >
                    <DragonModule v-bind="dragonModule"></DragonModule>
                </NGridItem>
            </NGrid>
        </template>
        <template>
            <NEmpty
                :class="$style['store-empty']"
                description="没有一个模块"
                size="huge"
            >
                <template #extra>
                    <NButton size="small">看看别的</NButton>
                </template>
            </NEmpty>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { NLayout, NEmpty, NButton, NGrid, NGridItem } from 'naive-ui';
import { useStore } from 'vuex';
import type { State } from '@/store';
import DragonModule from './DragonModule.vue';

export default defineComponent({
    components: {
        NLayout,
        NEmpty,
        NButton,
        DragonModule,
        NGrid,
        NGridItem
    },
    setup() {
        const store = useStore<State>();

        return {
            modules: computed(() => store.state.modules)
        };
    }
});
</script>

<style module>
.store {
    height: 100%;
    width: 100%;
    padding: 12px 24px;
}
.store-empty {
    height: 100%;
}
</style>
