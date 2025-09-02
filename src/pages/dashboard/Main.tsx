import React, { useState, useEffect } from 'react';
import { Card, Switch, Slider, Button, message, Input, Spin } from 'antd';
import { history } from 'umi';
import { doChatUsingPost } from '@/services/smart/aIchatController';
import DarkVeilBackground from '@/components/AuroraBackground';

const themeColor = '#4d82ffff'; // 主题色

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

  // 状态管理
  const [lightsOn, setLightsOn] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [colorTemp, setColorTemp] = useState(4000);
  const [lrHumidity] = useState(70);
  const [lrtemperature] = useState(20);

  const [acOn, setAcOn] = useState(true);
  const [temperature, setTemperature] = useState(24);

  const [securityOn] = useState(true);
  const [soilHumidity] = useState(70);
  const [envTemp] = useState(25);
  const [lighting] = useState(80);
  const [wateringTime, setWateringTime] = useState(10);

  // AI对话
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
      const res = await doChatUsingPost({ message: aiInput });
      setAiResponse(res || '无回复');
    } catch (e) {
      setAiResponse('AI服务异常');
    }
    setAiLoading(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Aurora 背景 */}
      <DarkVeilBackground
        hueShift={10}
        noiseIntensity={0.05}
        scanlineIntensity={1}
        scanlineFrequency={300}
        speed={1.8}
        warpAmount={0.1}
        resolutionScale={1.25}
      />

      {/* 星空背景 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 20,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{time}</div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: themeColor,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            letterSpacing: 2,
          }}
        >
          家庭主控
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button
            onClick={() => history.push('/user/login')}
            style={{ borderRadius: 50 }}
          >
            退出
          </Button>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#fff',
          textShadow: '2px 2px 6px rgba(0,0,0,0.4)',
          zIndex: 1,
        }}
      >
        智能家居，尽在掌控
      </div>

      {/* AI助手 */}
      <Card
        style={{
          borderRadius: 16,
          background: 'rgba(255,255,255,0.15)',
          padding: 16,
          boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
          zIndex: 1,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <h3
          style={{
            color: '#fff',
            marginBottom: 12,
            borderLeft: `4px solid ${themeColor}`,
            paddingLeft: 8,
          }}
        >
          家居智能助手
        </h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <Input
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="请问有什么可以帮您的？"
            onPressEnter={handleAiChat}
            style={{ flex: 1, borderRadius: 8 }}
            disabled={aiLoading}
          />
          <Button
            type="primary"
            onClick={handleAiChat}
            loading={aiLoading}
            style={{ borderRadius: 8, background: themeColor, border: 'none' }}
          >
            发送
          </Button>
        </div>
        <div
          style={{
            minHeight: 32,
            color: '#fff',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: 8,
            padding: 8,
          }}
        >
          {aiLoading ? <Spin /> : aiResponse}
        </div>
      </Card>

      {/* 主卡片行 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 24,
          zIndex: 1,
        }}
      >
        {/* 客厅 */}
        <Card
          style={{
            borderRadius: 20,
            background: 'rgba(255,255,255,0.12)',
            padding: 20,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            border: `1px solid ${themeColor}40`,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h2 style={{ color: themeColor, marginBottom: 12 }}>客厅</h2>
          <Card
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              padding: 16,
              marginBottom: 16,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <h3
              style={{
                marginBottom: 12,
                fontSize: 18,
                color: '#fff',
                borderLeft: `3px solid ${themeColor}`,
                paddingLeft: 6,
              }}
            >
              室温与湿度
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 26, color: '#fff' }}>
                {lrtemperature}°C
              </div>
              <div style={{ fontSize: 26, color: '#fff' }}>{lrHumidity}%</div>
            </div>
          </Card>
          <Card
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              padding: 16,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <h3
              style={{
                color: '#fff',
                borderLeft: `3px solid ${themeColor}`,
                paddingLeft: 6,
              }}
            >
              客厅灯光
            </h3>
            <div style={{ marginBottom: 12, fontSize: 30, color: '#fff' }}>
              {lightsOn ? '开启' : '关闭'}
            </div>
            <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
              亮度: {brightness}%丨色温: {colorTemp}K
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Switch
                checked={lightsOn}
                onChange={setLightsOn}
                style={{
                  marginBottom: 12,
                  background: lightsOn ? '#52c41a' : '#777',
                }}
              />
              <label style={{ color: '#fff' }}>亮度</label>
            </div>
            <Slider
              min={0}
              max={100}
              value={brightness}
              onChange={setBrightness}
              style={{ marginBottom: 12 }}
              trackStyle={{ backgroundColor: themeColor }}
              handleStyle={{ borderColor: themeColor }}
            />
            <label style={{ color: '#fff' }}>色温</label>
            <Slider
              min={2000}
              max={6500}
              value={colorTemp}
              onChange={setColorTemp}
              trackStyle={{ backgroundColor: themeColor }}
              handleStyle={{ borderColor: themeColor }}
            />
          </Card>
        </Card>

        {/* 卧室 */}
        <Card
          style={{
            borderRadius: 20,
            background: 'rgba(255,255,255,0.12)',
            padding: 20,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            border: `1px solid ${themeColor}40`,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h2 style={{ color: themeColor, marginBottom: 12 }}>卧室</h2>
          <Card
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              padding: 16,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <h3
              style={{
                color: '#fff',
                borderLeft: `3px solid ${themeColor}`,
                paddingLeft: 6,
              }}
            >
              空调温度
            </h3>
            <div style={{ marginBottom: 12, fontSize: 30, color: '#fff' }}>
              {acOn ? '开启' : '关闭'}
            </div>
            <div style={{ marginBottom: 12, fontSize: 18, color: '#fff' }}>
              温度: {temperature}°C
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Switch
                checked={acOn}
                onChange={setAcOn}
                style={{
                  marginBottom: 12,
                  background: acOn ? '#52c41a' : '#777',
                }}
              />
              <label style={{ color: '#fff' }}>温度调节</label>
            </div>
            <Slider
              min={16}
              max={30}
              value={temperature}
              onChange={setTemperature}
              trackStyle={{ backgroundColor: themeColor }}
              handleStyle={{ borderColor: themeColor }}
            />
          </Card>
        </Card>
      </div>

      {/* 次要卡片行 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          zIndex: 1,
        }}
      >
        {/* 厨房气体泄漏 */}
        <Card
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            padding: 16,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h3
            style={{
              color: '#fff',
              borderLeft: `3px solid ${themeColor}`,
              paddingLeft: 6,
            }}
          >
            厨房气体泄漏
          </h3>
          <div style={{ marginBottom: 8, fontSize: 30, color: '#fff' }}>
            {securityOn ? '安全' : '警告'}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <label
              style={{
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

        {/* 厕所 */}
        <Card
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            padding: 16,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h3
            style={{
              color: '#fff',
              borderLeft: `3px solid ${themeColor}`,
              paddingLeft: 6,
            }}
          >
            厕所使用情况
          </h3>
          <div style={{ marginBottom: 12, fontSize: 30, color: '#fff' }}>
            无人
          </div>
        </Card>

        {/* 门禁 */}
        <Card
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            padding: 16,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h3
            style={{
              color: '#fff',
              borderLeft: `3px solid ${themeColor}`,
              paddingLeft: 6,
            }}
          >
            屋外监控
          </h3>
          <div style={{ marginBottom: 12, fontSize: 30, color: '#fff' }}>
            无访客
          </div>
        </Card>

        {/* 植物护理 */}
        <Card
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            padding: 16,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <h3
            style={{
              color: '#fff',
              borderLeft: `3px solid ${themeColor}`,
              paddingLeft: 6,
            }}
          >
            植物护理
          </h3>
          <div
            style={{
              marginBottom: 12,
              fontSize: 16,
              color: '#fff',
            }}
          >
            土壤湿度: {soilHumidity}%丨环境温度: {envTemp}°C丨光照:
            {lighting}%
          </div>
          <label style={{ color: '#fff' }}>浇水时长 (秒)</label>
          <Slider
            min={5}
            max={60}
            value={wateringTime}
            onChange={setWateringTime}
            style={{ marginBottom: 16 }}
            trackStyle={{ backgroundColor: themeColor }}
            handleStyle={{ borderColor: themeColor }}
          />
          <Button
            style={{
              borderRadius: 50,
              width: '100%',
              background: `linear-gradient(90deg, ${themeColor}, #6e00ff)`,
              color: '#fff',
              border: 'none',
            }}
            onClick={() => alert(`开始浇水 ${wateringTime} 秒`)}
          >
            立即浇水
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          padding: 12,
          color: 'rgba(255,255,255,0.7)',
          zIndex: 1,
        }}
      >
        © 2025 屋平智能家居系统 | 让生活更智能，更便捷
      </div>
    </div>
  );
};

export default Dashboard;
