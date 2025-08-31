import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import React, { useState } from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '房主',
  },
  {
    key: '2',
    label: '家庭成员',
  },
  {
    key: '3',
    label: '访客',
  },
];

interface RegisterDropdownProps {
  onChange?: (lable: string) => void;
}

const Register_dropdown: React.FC<RegisterDropdownProps> = ({onChange}) => {
  // 使用 useState 钩子来管理当前选择的选项
  const [selectedLabel, setSelectedLabel] = useState<string>('请选择用户身份'); // 设置初始值为 'Item 3'

  // 处理菜单项选择的函数
  const handleMenuClick = (e: { key: string }) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label); // 更新当前选择的 label
      onChange?.(selectedItem.label as string); // 向父组件传递
    }
  };
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        onClick: handleMenuClick,
        defaultSelectedKeys: ['1'],
      }}
    >
      <Typography.Link>
        <Space>
          {selectedLabel}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default Register_dropdown;
