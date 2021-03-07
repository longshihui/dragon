import { RenderProcessModule } from '@/components/render-module';
import { ADD_MODULE, ModuleActionTypes } from './types';

export function addModule(module: RenderProcessModule): ModuleActionTypes {
    return {
        type: ADD_MODULE,
        payload: module
    };
}
