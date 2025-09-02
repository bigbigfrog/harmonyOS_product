import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, Tabs, Form, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import Register_dropdown from '@/components/Dropdown/Register_dropdown';
import { userRegisterUsingPost } from '@/services/smart/userController';
import { Link } from 'umi';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [userIdentity, setUserIdentity] = useState<string>('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
    // 新增：用于重置下拉框的key
  const [dropdownKey, setDropdownKey] = useState(0);

    // 监听userIdentity变化，确保UI同步
  useEffect(() => {
    console.log('用户身份更新:', userIdentity);
  }, [userIdentity]);
  // 完整重置逻辑
  const forceResetForm = () => {
    // 重置表单字段
    form.resetFields();
    // 重置下拉选择
    setUserIdentity('');
    // 强制重置下拉框组件
    setDropdownKey(prev => prev + 1);

  };

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword, userAccount } = values;

    // 前端校验
    if (userPassword !== checkPassword) {
      message.error('两次输入密码不一致!');
      return;
    }

    if(!userIdentity || userIdentity === '请选择用户身份') {
      message.error('请选择用户身份!');
      return;
    }

    const finalValues = { ...values, userIdentity };
    setLoading(true);

    try {
      const res = await userRegisterUsingPost(finalValues);

      if (res.code === 0) {
        message.success('注册成功！');
        forceResetForm(); // 成功时也清空表单

        // 延迟跳转，让用户看到成功消息
        setTimeout(() => {
          if (history) {
            const { query } = history.location;
            history.push({ pathname: 'login', query });
          }
        }, 1500);
      } else {
        const errorMsg = res.message || '注册失败，请检查信息后重试';
        message.error(errorMsg);
        forceResetForm();
      }
    } catch (error: any) {
      const errorMsg =
        (error.response?.data?.message) ||
        (error.message) ||
        '注册失败，请稍后重试！';
      message.error(errorMsg);
      forceResetForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Spin spinning={loading} size="large">
        <div className={styles.entryCockpit}>
          <div className={styles.hudArc} />
          <div className={`${styles.hudArc} ${styles.hudArc2}`} />

          {/* <div className={styles.hudCenter}> */}
          {/* 可选的HUD元素 */}
          {/* </div> */}

        </div>

        <div className={styles.content}>
          <LoginForm
            form={form}
            style={{ marginTop: '-29px' }}
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
            }}
            logo={<img alt="logo" src="/logo.svg" />}
            title={<span style={{ color: '#fff' }}>智能家居平台</span>}
            subTitle={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>创建您的账户</span>}
            onFinish={async (values) => {
              await handleSubmit(values as API.UserRegisterRequest);
            }}
          >
            <Tabs activeKey={type} onChange={setType} centered>
              <Tabs.TabPane
                key="account"
                tab={<span className={styles.tabText}>账户密码注册</span>}
              />
            </Tabs>

            {type === 'account' && (
              <>
                <ProFormText
                  name="userAccount"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入用户名"
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                    {
                      min: 4,
                      type: 'string',
                      message: '用户名不能少于 4 位！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="userPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入密码"
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: '长度不能小于 8 位！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请再次输入密码"
                  rules={[
                    {
                      required: true,
                      message: '确认密码是必填项！',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: '长度不能小于 8 位！',
                    },
                  ]}
                />

                <div style={{ marginBottom: 0 }}>
                  <Register_dropdown
                    value={userIdentity}
                    onChange={setUserIdentity}
                  />
                </div>

                <div style={{ height: 18 }} />

                <div style={{ marginBottom: 20, textAlign: 'center' }}>
                  <Link to="/user/login" style={{ color: '#1890ff' }}>
                    ← 返回登录页面
                  </Link>
                </div>
              </>
            )}
          </LoginForm>
        </div>
      </Spin>
    </div>
  );
};

export default Register;
