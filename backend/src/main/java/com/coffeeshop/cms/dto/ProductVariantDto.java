package com.coffeeshop.cms.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantDto {
    private Long id;
    private String size;
    private BigDecimal price;
    private Integer stock;
}
