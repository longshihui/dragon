import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default hot(function () {
    return (
        <ConfigProvider locale={zhCN}>
            <HashRouter></HashRouter>
        </ConfigProvider>
    );
});
