package com.coffeeshop.cms.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SalesData {
    private LocalDate date;
    private BigDecimal totalSales;
    private Long totalOrders;
}
