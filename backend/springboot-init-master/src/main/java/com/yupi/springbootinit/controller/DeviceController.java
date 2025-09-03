package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.service.MqttMessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeviceController {
    @Autowired
    private MqttMessageSender mqttMessageSender;

    @RequestMapping(method = RequestMethod.GET,path = "/send")
    public String send(@RequestParam String topic, @RequestParam String message) {
        System.out.println("---向开发板发送信息---"+message);
        mqttMessageSender.sendMessage(topic, message);
        return "Message send to topic " + topic;
    }
}
