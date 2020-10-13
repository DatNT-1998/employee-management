import React, { useState, useEffect } from 'react';
import { Menu, Layout, Spin, Affix } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './style.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import Header from '../../components/Header/index';
import Notification from '../../components/Notification';
import BreadcrumbList from './Breadcrumb/index';
import MenuList from './Menu/index';
import LocaleToggle from '../LocaleToggle/index';
import { saveClaim } from '../../redux/actions/config';
import { auth } from '../../firebase';
import useDimensions from '../../hooks/useDimensions';

import GET_ME from '../../graphql/get-me.gql';
import { Redirect, useLocation } from 'react-router';

const Dashboard = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const user_id = useSelector(state => state.config.user_id);

    const location = useLocation()

    const { width, height } = useDimensions();

    useEffect(() => {
        setCollapsed(width <= 758);
    }, [width, height]);

    const dispatch = useDispatch();

    const { data, loading, error } = useQuery(GET_ME, {
        variables: {
            id: user_id,
        },
        fetchPolicy: 'cache-and-network',
    });
    console.log('loading, error', loading, error, data);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const _logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
        } finally {
            dispatch(saveClaim(false));
        }
    };

    if (!!data && !!data.users_by_pk && data.users_by_pk.shop.length == 0 && !location.pathname.startsWith('/manager/shop/profile')) {
        return <Redirect to='/manager/shop/profile' />
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="site-layout-background"
                style={{ background: '#fff', boxShadow: '0 1px 4px 0 rgba(74,74,78,.12)' }}
            >
                <MenuList />
            </Layout.Sider>
            <Layout className="site-layout">
                <Affix>
                    <Layout.Header
                        className="site-layout-background"
                        style={{ padding: 0, boxShadow: '0 1px 4px 0 rgba(74,74,78,.12)' }}
                    >
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: toggle,
                            },
                        )}
                        <Layout.Content className="header-left">
                            <LocaleToggle />
                        </Layout.Content>
                        <Layout.Content className="header-right">
                            <Header
                                onLogout={_logout}
                                user={data ? data.users_by_pk : undefined}
                            />
                        </Layout.Content>
                        <Layout.Content className="header-left">
                            <Notification />
                        </Layout.Content>
                    </Layout.Header>
                </Affix>
                <Layout.Content
                    style={{
                        padding: '0px 24px 24px 24px',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <BreadcrumbList />
                    {!loading && !error && children}
                    {loading && <Spin />}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

Dashboard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Dashboard;