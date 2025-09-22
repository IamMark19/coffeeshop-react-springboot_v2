package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.OrderDto;
import com.coffeeshop.cms.dto.OrderRequestDto;
import com.coffeeshop.cms.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderDto createOrder(@RequestBody com.coffeeshop.cms.dto.OrderRequestDto orderRequestDto) {
        return orderService.createOrder(orderRequestDto);
    }

    @GetMapping
    public List<OrderDto> getOrders(@AuthenticationPrincipal Jwt jwt) {
        String googleId = jwt.getSubject();
        return orderService.getOrdersForUser(googleId);
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable Long id) {
        // Assuming this is for the user to see their own order
        return orderService.getOrderById(id);
    }
}
