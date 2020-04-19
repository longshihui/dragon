import React from 'react';
import { Menu } from 'antd';
import { WindowsOutlined, SnippetsOutlined } from '@ant-design/icons';
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
                <SnippetsOutlined />
                <span>工作类</span>
            </MenuItem>
        </Menu>
    );
}
