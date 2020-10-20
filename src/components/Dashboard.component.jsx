import React from 'react';
import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton.component';


const { Header, Content, Sider } = Layout;

class Dashboard extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="employee">Employee</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PieChartOutlined />}>
                            <Link to="profile">Profile</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <LoginButton />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withAuth0(Dashboard);