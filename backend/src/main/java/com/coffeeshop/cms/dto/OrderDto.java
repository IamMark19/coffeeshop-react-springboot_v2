package com.coffeeshop.cms.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Long userId;
    private String customerName;
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal total;
    private List<OrderItemDto> orderItems;
}
