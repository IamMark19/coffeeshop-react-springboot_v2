package com.coffeeshop.cms.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long productVariantId;
    private Integer quantity;
    private BigDecimal price;
    private String size;
}
