package com.yupi.springbootinit.service.impl;

import com.yupi.springbootinit.manager.AIManager;
import com.yupi.springbootinit.service.AIChatService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AIChatServiceImpl implements AIChatService {
    @Resource
    private AIManager aiManager;

    @Override
    public String doChat(String message) {
        return aiManager.sendMsgToXingHuo(true,message);
    }
}
