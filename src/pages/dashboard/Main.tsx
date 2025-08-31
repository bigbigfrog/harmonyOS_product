import React, { useState, useEffect,useRef } from 'react';
import {Card, Switch, Slider, Button, message,Input,Spin} from 'antd';
import { history } from 'umi';
import livingroom from '/public/icons/livingroom.png';
import bedroom from '/public/icons/bedroom.png';
import {doChatUsingPost} from "@/services/smart/aIchatController";


/**
 * Dashboard 页面（完整整合版）
 */
const Dashboard: React.FC = () => {
  // 时间显示
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 灯光状态
  const [lightsOn, setLightsOn] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [colorTemp, setColorTemp] = useState(4000);

  // 空调状态
  const [acOn, setAcOn] = useState(true);
  const [temperature, setTemperature] = useState(24);

  // 安防状态
  const [securityOn, setSecurityOn] = useState(true);

  // 通风系统
  const [ventOn, setVentOn] = useState(true);
  const [ventSpeed, setVentSpeed] = useState(2);
  const ventSpeedLabels = ['低', '中', '高'];

  // 植物护理
  const [soilHumidity, setSoilHumidity] = useState(70);
  const [envTemp, setEnvTemp] = useState(25);
  const [lighting, setLighting] = useState(80);
  const [wateringTime, setWateringTime] = useState(10);

  // AI对话相关
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleAiChat = async () => {
    if (!aiInput.trim()) {
      message.warning('请输入内容');
      return;
    }
    setAiLoading(true);
    setAiResponse('');
    try {
      const res = await doChatUsingPost({message: aiInput});
      setAiResponse(res || '无回复');
    } catch (e) {
      setAiResponse('AI服务异常');
    }
    setAiLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 24,
        background: 'linear-gradient(-225deg, #7e6780ff 0%, #2580B3 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 20,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{time}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#ffdd00' }}>jiaju desuwa</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button style={{ borderRadius: 50 }}>账号信息</Button>
          <Button onClick={() => history.push('/user/login')} style={{ borderRadius: 50 }}>退出</Button>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', fontSize: 20, color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        智能家居，尽在掌控
      </div>

      {/* AI对话卡片 */}
      <Card
        style={{
          borderRadius: 16,
          background: 'rgba(255,255,255,0.15)',
          padding: 16,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <h3 style={{ color: '#fff', marginBottom: 12 }}>家居智能助手</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <Input
            value={aiInput}
            onChange={e => setAiInput(e.target.value)}
            placeholder="请问有什么可以帮您的？"
            onPressEnter={handleAiChat}
            style={{ flex: 1, borderRadius: 8 }}
            disabled={aiLoading}
          />
          <Button
            type="primary"
            onClick={handleAiChat}
            loading={aiLoading}
            style={{ borderRadius: 8 }}
          >
            发送
          </Button>
        </div>
        <div style={{ minHeight: 32, color: '#fff', background: 'rgba(0,0,0,0.05)', borderRadius: 8, padding: 8 }}>
          {aiLoading ? <Spin /> : aiResponse}
        </div>
      </Card>

      {/* 设备卡片容器 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >

        {/* 客厅总览 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16,
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center',
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Button
          style={{  border: 'none', }}
          icon={<img src={livingroom} style={{ width: 15, height: 15, marginBottom:6.4}} />}
          size="large"
          onClick={() => history.push('/dashboard/livingroom')}>
            进入客厅界面
          </Button>
        </Card>

        {/* 卧室总览 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16,
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center',
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Button
          style={{  border: 'none', }}
          icon={<img src={bedroom} style={{ width: 15, height: 15, marginBottom:6.4}} />}
          size="large"
          onClick={() => history.push('/dashboard/bedroom')}>
            进入卧室界面
          </Button>
        </Card>

        {/* 安防 */}
        <Card
          style={{
            borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h3 style={{ color: '#fff' }}>安全监控</h3>
          <div style={{ marginBottom: 12, fontSize: 36, color: '#fff' }}>
             {securityOn ? '已布防' : '未布防'}
          </div>
            <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'flex-start' }}>
              <Switch checked={securityOn} onChange={setSecurityOn} style={{ marginBottom: 12 }} />
              <label
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: 'linear-gradient(to right, #00b09b, #96c93d)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                安全状态良好
              </label>
            </div>

        </Card>

        {/* 通风系统 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16 }}
          bodyStyle={{ padding: 0 }}
        >
          <h3 style={{ color: '#fff' }}>通风系统</h3>
          <div style={{ marginBottom: 12, fontSize:36 , color: '#fff' }}>
             {ventOn ? '开启' : '关闭'}
          </div>
          <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
              风速: {ventSpeedLabels[ventSpeed - 1]}风速丨空气质量: 良好丨湿度: 45%
          </div>
          <Switch checked={ventOn} onChange={setVentOn} style={{ marginBottom: 12 }} />
          <label style={{ color: '#fff', display: 'block' }}>风速</label>
          <Slider
            min={1}
            max={3}
            value={ventSpeed}
            onChange={setVentSpeed}
            marks={{
              1: <span style={{ color: 'white' }}>低</span>,
              2: <span style={{ color: 'white' }}>中</span>,
              3: <span style={{ color: 'white' }}>高</span>,
             }}
            step={1}
            style={{ marginBottom: 32 }}
          />
        </Card>

        {/* 植物护理 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16, textAlign: 'center' }}
          bodyStyle={{ padding: 0 }}
        >
          <h3 style={{ color: '#fff', marginBottom: 12 }}>植物护理</h3>
          <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
            土壤湿度: {soilHumidity}%丨环境温度: {envTemp}°C丨光照: {lighting}%
          </div>
          <label style={{ color: '#fff', display: 'block' }}>浇水时长 (秒)</label>
          <Slider min={5} max={60} value={wateringTime} onChange={setWateringTime} style={{ marginBottom: 12 }} />
          <Button
            style={{ borderRadius: 50, width: '100%' }}
            onClick={() => alert(`开始浇水 ${wateringTime} 秒`)}
          >
            立即浇水
          </Button>
        </Card>

        {/* 场景模式卡片 */}
        {/* {[
          { title: '影院模式', desc: '调暗灯光，关闭窗帘，准备观影体验', color: '#ffdd00' },
          // { title: '睡眠模式', desc: '关闭所有灯光，调节空调至舒适温度', color: '#aaaaff' },
          // { title: '起床模式', desc: '逐渐亮起灯光，播放轻柔音乐', color: '#ffaa33' },
        ].map((scene) => (
          <Card
            key={scene.title}
            style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 24, textAlign: 'center' }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ fontSize: 28, marginBottom: 12, color: scene.color }}>●</div>
            <h3 style={{ color: '#fff', marginBottom: 8 }}>{scene.title}</h3>
            <div style={{ color: '#fff', marginBottom: 16 }}>{scene.desc}</div>
            <Button style={{ width: '100%', borderRadius: 50 }}>一键启动</Button>
          </Card>
        ))} */}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: 12, color: 'rgba(255,255,255,0.7)' }}>
        © 2025 屋平智能家居系统 | 让生活更智能，更便捷
      </div>
    </div>
  );
};

export default Dashboard;
