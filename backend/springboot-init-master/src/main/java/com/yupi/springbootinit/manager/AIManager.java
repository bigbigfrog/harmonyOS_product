package com.yupi.springbootinit.manager;

import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import io.github.briqt.spark4j.SparkClient;
import io.github.briqt.spark4j.constant.SparkApiVersion;
import io.github.briqt.spark4j.model.SparkMessage;
import io.github.briqt.spark4j.model.request.SparkRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Slf4j
public class AIManager {

    @Resource
    private SparkClient sparkClient;

    /**
     * 向 AI 发送请求
     * @param isNeedTemplate 是否使用模板，进行 AI 生成； true 使用 、false 不使用 ，false 的情况是只想用 AI 不只是生成前端代码
     * @param content        内容
     * @return AI 返回的内容
     */
    public String sendMsgToXingHuo(boolean isNeedTemplate, String content) {
        List<SparkMessage> messages = new ArrayList<>();
        if (isNeedTemplate) {
            // AI 生成问题的预设条件
            String predefinedInformation = "假设你是一位智能家居专用的智慧家居管理AI，你的任务可以和用户聊天，帮助用户定时开关电器，对环境数据作出分析建议等\n";
            messages.add(SparkMessage.systemContent(predefinedInformation + "\n" + "---"));
        }
        messages.add(SparkMessage.userContent(content));
        // 构造请求
        SparkRequest sparkRequest = SparkRequest.builder()
                // 消息列表
                .messages(messages)
                // 模型回答的tokens的最大长度,非必传,取值为[1,4096],默认为2048
                .maxTokens(2048)
                // 核采样阈值。用于决定结果随机性,取值越高随机性越强即相同的问题得到的不同答案的可能性越高 非必传,取值为[0,1],默认为0.5
                .temperature(0.6)
                // 指定请求版本
                .apiVersion(SparkApiVersion.V3_5)
                .build();
        // 同步调用
        String responseContent = sparkClient.chatSync(sparkRequest).getContent().trim();
        if (!isNeedTemplate) {
            return responseContent;
        }
//        log.info("星火 AI 返回的结果 {}", responseContent);
//        AtomicInteger atomicInteger = new AtomicInteger(1);
//        while (responseContent.split("'【【【【'").length < 3) {
//            responseContent = sparkClient.chatSync(sparkRequest).getContent().trim();
//            if (atomicInteger.incrementAndGet() >= 4) {
//                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "星火 AI 生成失败");
//            }
//        }
        return responseContent;
    }
}

