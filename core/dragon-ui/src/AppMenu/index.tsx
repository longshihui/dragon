import React from 'react';
import { Menu } from 'antd';
import {
    WindowsOutlined,
    HighlightOutlined,
    FieldTimeOutlined
} from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';

const { Item: MenuItem } = Menu;

export default function AppMenu() {
    const { pathname } = useLocation();
    const history = useHistory();

    function changeRouter({ key }) {
        history.push(key);
    }

    return (
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
            <MenuItem key="/" onClick={changeRouter}>
                <WindowsOutlined />
                <span>首页</span>
            </MenuItem>
            <MenuItem key="/work" onClick={changeRouter}>
                <HighlightOutlined />
                <span>工作类</span>
            </MenuItem>
            <MenuItem key="/work-time-control" onClick={changeRouter}>
                <FieldTimeOutlined />
                <span>工作时间控制器</span>
            </MenuItem>
        </Menu>
    );
}
