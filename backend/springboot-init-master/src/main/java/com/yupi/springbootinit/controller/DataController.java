package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.model.entity.CollectData;
import com.yupi.springbootinit.service.CollectDataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Slf4j
public class DataController {
    @Resource
    private CollectDataService collectDataService;

    @GetMapping("/query")
    public BaseResponse<CollectData> query(String roomType){
        return ResultUtils.success(collectDataService.queryData(roomType));
    }
}
