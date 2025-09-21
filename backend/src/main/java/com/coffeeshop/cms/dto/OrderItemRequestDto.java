package com.coffeeshop.cms.dto;

import lombok.Data;

@Data
public class OrderItemRequestDto {
    private Long productVariantId;
    private Integer quantity;
}
