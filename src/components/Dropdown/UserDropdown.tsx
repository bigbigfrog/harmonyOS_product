import React from 'react';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';


const UserDropdown: React.FC = () => {

  const { initialState } = useModel?.('@@initialState') || {};
  const currentUser = initialState?.currentUser;
  const userIdentity = currentUser?.userIdentity || '未知';

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: `当前身份：${userIdentity}`,
      // onClick: () => history.push('/user/profile'),
    },
    // {
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   label: '设置',
    //   onClick: () => history.push('/user/settings'),
    // },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
      onClick: () => history.push('/user/login'),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Avatar
        size="large"
        style={{
          cursor: 'pointer',
          backgroundColor: '#7265e6',
        }}
      >
        U
      </Avatar>
    </Dropdown>
  );
};

export default UserDropdown;
