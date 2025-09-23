package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.OrderDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.service.OrderService;
import com.coffeeshop.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping
    public OrderDto createOrder(@RequestBody com.coffeeshop.cms.dto.OrderRequestDto orderRequestDto, @AuthenticationPrincipal UserDetails userDetails) {
        return orderService.createOrder(orderRequestDto, userDetails);
    }

    @GetMapping
    public List<OrderDto> getOrders(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return orderService.getOrdersForUser(user.getId());
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
