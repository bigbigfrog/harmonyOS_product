import React, { useState, useEffect } from 'react';
import { Card, Switch, Slider, Button } from 'antd';
import { Link } from 'umi';
import {ArrowLeftOutlined} from "@ant-design/icons";

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

      {/* <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
          // justifyItems: 'stretch', // 关键：让每个网格单元拉伸
          background: 'linear-gradient(-225deg, #7e6780ff 0%, #2580B3 100%)',

        }}
      > */}

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
        <div style={{ fontSize: 28, fontWeight: 800, color: '#ffdd00' }}>客厅 desuwa</div>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', fontSize: 20, color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        智能家居，尽在掌控
      </div>
      <Link to="/dashboard/main">
        <ArrowLeftOutlined style={{fontSize:'175%',color:'#84c1dc'}} />
      </Link>

      {/* 设备卡片容器 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {/* 卧室灯光 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16 }}
          bodyStyle={{ padding: 0 }}
        >
          <h3 style={{ color: '#fff' }}>客厅灯光</h3>
          <div style={{ marginBottom: 12, fontSize: 36, color: '#fff' }}>
             {lightsOn ? '开启' : '关闭'}
          </div>
          <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
            亮度: {brightness}%丨色温: {colorTemp}K
          </div>
          <Switch checked={lightsOn} onChange={setLightsOn} style={{ marginBottom: 12 }} />
          <label style={{ color: '#fff', display: 'block' }}>亮度</label>
          <Slider min={0} max={100} value={brightness} onChange={setBrightness} style={{ marginBottom: 12 }} />
          <label style={{ color: '#fff', display: 'block' }}>色温</label>
          <Slider min={2000} max={6500} value={colorTemp} onChange={setColorTemp} />
        </Card>

        {/* 空调 */}
        <Card
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.1)', padding: 16 }}
          bodyStyle={{ padding: 0 }}
        >
          <h3 style={{ color: '#fff' }}>空调温度</h3>
          <div style={{ marginBottom: 12, fontSize: 36, color: '#fff' }}>
             {acOn ? '开启' : '关闭'}
          </div>
          <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
              温度: {temperature}°C
          </div>
          <Switch checked={acOn} onChange={setAcOn} style={{ marginBottom: 12 }} />
          <label style={{ color: '#fff', display: 'block' }}>温度调节</label>
          <Slider min={16} max={30} value={temperature} onChange={setTemperature} />
        </Card>

        {/* 场景模式卡片 */}
        {[
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
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: 12, color: 'rgba(255,255,255,0.7)' }}>
        © 2025 屋平智能家居系统 | 让生活更智能，更便捷
      </div>
    </div>
  );
};

export default Dashboard;
