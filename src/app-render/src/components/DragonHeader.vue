<template>
    <NLayoutHeader id="dragon-app-header" bordered>
        <div class="dragon-app-logo">
            <NH1 class="dragon-app-logo__text">Dragon</NH1>
        </div>
        <div class="dragon-app-header__actions">
            <slot />
        </div>
        <div class="dragon-app-header__router">
            <NButton v-if="visibleBackBtn" strong secondary @click="handleBack"
                >返回</NButton
            >
        </div>
    </NLayoutHeader>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { NLayoutHeader, NH1, NButton } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    components: {
        NLayoutHeader,
        NH1,
        NButton
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const visibleBackBtn = computed(() => {
            return route.path !== '/';
        });

        function handleBack() {
            router.push({
                path: '/'
            });
        }

        return {
            visibleBackBtn,
            handleBack
        };
    }
});
</script>

<style lang="scss" scoped>
#dragon-app-header {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;

    .dragon-app-logo {
        flex: 1;
        .dragon-app-logo__text {
            margin: 0;
        }
    }

    .dragon-app-header__actions,
    .dragon-app-header__router {
        flex: 0 0 auto;
    }
}
</style>
