package com.coffeeshop.cms.dto;

import lombok.Data;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private String address;
    private LatLngDto coordinates;
}
