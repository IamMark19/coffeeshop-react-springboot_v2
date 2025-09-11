package com.coffeeshop.cms.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryLogDto {
    private Long id;
    private Long productId;
    private String productName;
    private Integer changeAmount;
    private LocalDateTime updatedAt;
}
