package com.coffeeshop.cms.dto;

import com.coffeeshop.cms.model.enums.DeliOption;
import com.coffeeshop.cms.model.enums.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private CustomerDto customer;
    private List<OrderItemDto> items;
    private DeliOption deliOption;
    private PaymentMethod paymentMethod;
    private BigDecimal totalPayment;
    private LocalDateTime date;
    private String image;
    private String status;
}
