package com.yupi.springbootinit.service;

public interface AIChatService {
    /**
     * 对话AI
     * @param message 用户自己输入消息
     * @return AI生成的回答
     */
    String doChat(String message);
}
