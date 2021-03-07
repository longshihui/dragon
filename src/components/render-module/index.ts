import { ReactNode, ReactFragment, Component } from 'React';

type StaticRender = Component | (() => ReactNode | ReactFragment);
type DynamicRender = () => Promise<StaticRender>;

interface RenderProcessModule {
    id: string; // 模块id
    name: string; // 模块的语义化名字
    desc: string; // 模块的具体描述
    routePath: string; // 路由路径
    render: StaticRender | DynamicRender; // 代码入口
}

export function defineRenderModule(module: RenderProcessModule) {
    return module;
}
