import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import AppMenu from '../AppMenu';

const { Header, Sider, Content } = Layout;

export default class AppLayout extends React.Component {
    state = {
        collapsed: false
    };

    get logeClasses() {
        return this.state.collapsed ? 'app-logo app-logo--mini' : 'app-logo';
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <Layout className="app-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="app-logo-wrap">
                        <div className={this.logeClasses} />
                    </div>
                    <AppMenu />
                </Sider>
                <Layout>
                    {/* <Header className="app-header" style={{ padding: 0 }}>
                        {React.createElement(
                            this.state.collapsed
                                ? MenuUnfoldOutlined
                                : MenuFoldOutlined,
                            {
                                className: 'app-header-collapse-trigger',
                                onClick: this.toggle
                            }
                        )}
                    </Header> */}
                    <Content
                        className="app-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
