package com.coffeeshop.cms.dto;

import com.coffeeshop.cms.model.enums.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequestDto {
    private Long userId;
    private List<OrderItemRequestDto> items;
    private BigDecimal totalPrice;
    private OrderStatus status;
}
