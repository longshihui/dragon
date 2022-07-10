/**
 * 菜单设置
 */
import { Menu } from 'electron';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'app顶部菜单栏',
    setup: async function MenuSetup() {
        // 隐藏原生菜单栏
        Menu.setApplicationMenu(null);
    }
});
