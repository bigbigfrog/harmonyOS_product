package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 收集板子数据
 * @TableName collect_data
 */
@TableName(value ="collect_data")
@Data
public class CollectData {
    /**
     * 数据ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 房间类型
     */
    private String roomType;

    /**
     * 温度
     */
    private String temperature;

    /**
     * 湿度
     */
    private String wet;

    /**
     * 气体浓度
     */
    private String gasDegree;

    /**
     * 是否有明火(0无1有)
     */
    private Integer ifFire;

    /**
     * 是否有泄漏(0无1有)
     */
    private Integer isLeak;

    /**
     * 光线是否暗，即是否有人遮光(0无1有)
     */
    private Integer isDark;
}