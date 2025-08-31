package com.yupi.springbootinit.manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AIManagerTest {

    @Resource
    private AIManager aiManager;

    @Test
    void chat() {
        String c = "你好";
        String ans = aiManager.sendMsgToXingHuo(true,c);
        System.out.println(ans);
    }
}