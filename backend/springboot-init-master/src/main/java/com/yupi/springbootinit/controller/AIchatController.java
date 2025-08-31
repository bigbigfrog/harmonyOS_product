package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.service.AIChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/chat")
@Slf4j
public class AIchatController {
    @Resource
    private AIChatService chatService;

    @PostMapping("/send")
    public String doChat(@RequestParam String message){
        return chatService.doChat(message);
    }

}
