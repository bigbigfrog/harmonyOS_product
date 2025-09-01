import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import Register_dropdown from '@/components/Dropdown/Register_dropdown';
import { userRegisterUsingPost } from '@/services/smart/userController';
import { Link } from 'umi';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [userIdentity, setUserIdentity] = useState<string>('');
  // 表单提交
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入密码不一致!');
      return;
    }
    if(!userIdentity||userIdentity==='请选择用户身份'){
      message.error('请选择用户身份!');
      return;
    }
    const finalValues = { ...values, userIdentity };
    try {
      // 注册
      const res = await userRegisterUsingPost(finalValues);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: 'login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.entryCockpit}>
        <div className={styles.hudArc} />
        <div className={`${styles.hudArc} ${styles.hudArc2}`} />
        <div className={styles.hudCenter}>
          {/* <div className={styles.hudTitle}>EVA-01 ENTRY PLUG</div>
          <div className={styles.hudWarning}>EMERGENCY</div>
          <div className={styles.hudIndicator}>
            <span>SYNC RATE</span>
            <span className={styles.hudValue}>78.2%</span>
          </div>
          <div className={styles.hudIndicator}>
            <span>L.C.L LEVEL</span>
            <span className={styles.hudValue}>STABLE</span>
          </div> */}
          {/* <div className={styles.hudBar}>
            <div className={styles.hudBarFill} />
          </div> */}
        </div>
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title={<span style={{ color: '#ffffffff' }}>智能家居</span>}
          subTitle={<span style={{ color: '#ffffffff' }}>副标题desuwa</span>}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs activeKey={type} onChange={setType} centered>
            <Tabs.TabPane
              key="account"
              tab={<span className={styles.tabText}> 账户密码注册 </span>}
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
              {/*<ProFormText*/}
              {/*  name="userIdentity"*/}
              {/*  fieldProps={{*/}
              {/*    size: 'large',*/}
              {/*    prefix: <UserOutlined className={styles.prefixIcon} />,*/}
              {/*  }}*/}
              {/*  placeholder="请输入用户身份"*/}
              {/*  rules={[*/}
              {/*    {*/}
              {/*      required: true,*/}
              {/*      message: '用户身份是必填项！',*/}
              {/*    },*/}
              {/*  ]}*/}
              {/*/>*/}
              <Register_dropdown onChange={setUserIdentity}/>
              <div style={{ height: 18 }} />

              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <Link to="/user/login">返回登录</Link>
              </div>

            </>
          )}
        </LoginForm>
      </div>
    </div>
  );
};
export default Register;
