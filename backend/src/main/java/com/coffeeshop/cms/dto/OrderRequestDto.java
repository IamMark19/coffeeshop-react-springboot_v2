package com.coffeeshop.cms.dto;

import com.coffeeshop.cms.model.enums.DeliOption;
import com.coffeeshop.cms.model.enums.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequestDto {
    private CustomerDto customer;
    private List<OrderItemDto> items;
    private DeliOption deliOption;
    private PaymentMethod paymentMethod;
    private BigDecimal totalPayment;
}
