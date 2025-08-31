package com.yupi.springbootinit.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping(method = RequestMethod.GET,path = "/send")
    public String send(@RequestParam String cmd) {
        System.out.println("cmd = "+cmd);
        System.out.println("---send to mqtt---");
        return "success";
    }
}
