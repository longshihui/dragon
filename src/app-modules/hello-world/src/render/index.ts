import { useUI } from '@dragon-app/core';
import HelloWorld from './HelloWorld.vue';

export default useUI({
    id: 'hello-world',
    name: '你好，世界',
    route: {
        path: '/hello-world',
        component: HelloWorld
    }
});
