package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.entity.CollectData;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author YK
* @description 针对表【collect_data(收集板子数据)】的数据库操作Service
* @createDate 2025-09-01 17:45:58
*/
public interface CollectDataService extends IService<CollectData> {
    long storeData(String message, String roomType);
    CollectData queryData(String roomType);
}
