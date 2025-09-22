package com.coffeeshop.cms.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String name;
    private String googleId;
}
