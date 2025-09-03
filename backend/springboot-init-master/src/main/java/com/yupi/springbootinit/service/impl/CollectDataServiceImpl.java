package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.mapper.CollectDataMapper;
import com.yupi.springbootinit.model.entity.CollectData;
import com.yupi.springbootinit.service.CollectDataService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
* @author YK
* @description 针对表【collect_data(收集板子数据)】的数据库操作Service实现
* @createDate 2025-09-01 17:45:58
*/
@Service
public class CollectDataServiceImpl extends ServiceImpl<CollectDataMapper, CollectData> implements CollectDataService {

    private int counter = 0;

    @Override
    public long storeData(String message, String roomType){
       if(StringUtils.isAnyBlank(message,roomType)){
           throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
       }
       counter++;
       if(counter<5)return 0;
       QueryWrapper<CollectData> queryWrapper = new QueryWrapper<>();
       queryWrapper.eq("roomType", roomType);
       CollectData existData = this.baseMapper.selectOne(queryWrapper);
       String[] result = message.split(",");
       if(existData==null){
            CollectData collectData = new CollectData();
            collectData.setRoomType(roomType);
            setData(roomType, collectData, result);
            boolean saveResult = this.save(collectData);
            if (!saveResult) {
               throw new BusinessException(ErrorCode.SYSTEM_ERROR, "插入失败，数据库错误");
            }
            counter = 0;
            return collectData.getId();
       }
        else{
           setData(roomType, existData, result);
           boolean updateResult = this.updateById(existData);
           if (!updateResult) {
               throw new BusinessException(ErrorCode.SYSTEM_ERROR, "更新失败，数据库错误");
           }
           counter = 0;
           return existData.getId();
       }
    }

    @Override
    public CollectData queryData(String roomType) {
            QueryWrapper<CollectData> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("roomType", roomType);
            return this.baseMapper.selectOne(queryWrapper);
    }

    private void setData(String roomType, CollectData handleData, String[] result) {
        switch (roomType) {
            case "livingroom":
                handleData.setTemperature(result[0]);
                handleData.setWet(result[1]);
                handleData.setIfFire(Integer.parseInt(result[2]));
                break;
            case "bedroom":
                handleData.setTemperature(result[0]);
                handleData.setWet(result[1]);
                handleData.setIsDark(Integer.parseInt(result[2]));
                break;
            case "kitchen":
                handleData.setIsLeak(Integer.parseInt(result[0]));
                handleData.setGasDegree(result[1]);
                break;
            case "toilet":
                handleData.setIsDark(Integer.parseInt(result[0]));
                break;
            case "doorway":
                handleData.setIsDark(Integer.parseInt(result[0]));
                break;
        }
    }
}