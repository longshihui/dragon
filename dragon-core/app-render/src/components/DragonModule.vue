<template>
    <div class="dragon-module" @click="goToModule(path)">
        <div class="dragon-module__icon"></div>
        <div class="dragon-module__main">
            <NP :strong="true" class="dragon-module__name">{{ name }}</NP>
            <NP class="dragon-module__desc">{{ desc }}</NP>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NP } from 'naive-ui';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        desc: {
            type: String
        }
    },
    components: {
        NP
    },
    setup() {
        const router = useRouter();

        function goToModule(path: string) {
            console.log(path);
            router.push({
                path
            });
        }

        return {
            goToModule
        };
    }
});
</script>

<style lang="scss" scoped>
.dragon-module {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    transition: 0.3s all ease;
    &:hover {
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.5);
    }

    .dragon-module__icon {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        background: #ccc;
    }

    .dragon-module__main {
        height: 40px;
        flex: 1;
        margin-left: 8px;
    }
}
</style>
