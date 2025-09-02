import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  { key: '1', label: '房主' },
  { key: '2', label: '家庭成员' },
  { key: '3', label: '访客' },
];

interface RegisterDropdownProps {
  value?: string;
  onChange?: (label: string) => void;
}

const Register_dropdown: React.FC<RegisterDropdownProps> = ({ value = '', onChange }) => {
  const displayText = value || '请选择用户身份';

  const handleMenuClick = (e: { key: string }) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem && onChange) {
      onChange(selectedItem.label as string);
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        onClick: handleMenuClick,
      }}
      trigger={['click']}
    >
      {/* 移除边框样式 */}
      <Typography.Link style={{ 
        display: 'block', 
        padding: '8px 0', // 调整内边距
        color: 'rgba(255, 255, 255, 0.8)', // 白色文字
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        <Space>
          {displayText}
          <DownOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default Register_dropdown;
