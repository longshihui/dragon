import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

const MetadataKeys = {
    TOKEN: 'dragon-module:token'
};

/**
 * 声明一个Dragon模块的后台
 * @param options
 * @returns
 */
export function DragonModuleBackend(options: { token: symbol }) {
    return function (target: any) {
        Reflect.defineMetadata(MetadataKeys.TOKEN, options.token, target);
        return injectable()(target);
    };
}

/**
 * 成员装饰器，用于注入另一个Dragon模块
 * @param token
 * @returns
 */
export function useDragonModule(token: symbol) {
    return function (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) {
        return inject(token)(target, propertyKey, parameterIndex);
    };
}
