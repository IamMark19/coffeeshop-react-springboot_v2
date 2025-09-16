package com.coffeeshop.cms.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String image;
    private String type;
    private List<ProductVariantDto> variants;
}
