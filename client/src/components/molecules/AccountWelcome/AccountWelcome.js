import React, { useContext } from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/app-context';
import { AccountWelcomeWrapper } from "./AccountWelcome.styles";

export const AccountWelcome = () => {
    const { user } = useContext(AppContext);
    var welcome = '';
    if (user.firstName && user.lastName) {
        welcome = 'Welcome back, ' + user.firstName + ' ' + user.lastName + '!'
    } else {
        welcome = 'Welcome back!'
    }
    return (
        <AccountWelcomeWrapper>
            <Avatar
            size={{ xs: 54, sm: 62, md: 70, lg: 94, xl: 110, xxl: 130 }}
            icon={<UserOutlined />}
            />
            <h3>{welcome}</h3>
        </AccountWelcomeWrapper>
    );
};
