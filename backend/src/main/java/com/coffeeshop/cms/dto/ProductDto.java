package com.coffeeshop.cms.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private List<ProductVariantDto> variants;
}
