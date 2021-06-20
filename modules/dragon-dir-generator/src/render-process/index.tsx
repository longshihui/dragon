import { defineRenderModule } from '@/components/render-module';

export default defineRenderModule({
    id: 'dir-generator',
    name: '目录构造器',
    desc: '用于根据预设构造目录结构；例如构造项目工作目录结构。',
    routePath: '/',
    render: () => import('./Root')
});
