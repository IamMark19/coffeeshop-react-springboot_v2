package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.OrderDto;
import com.coffeeshop.cms.dto.OrderItemDto;
import com.coffeeshop.cms.model.Order;
import com.coffeeshop.cms.model.OrderItem;
import com.coffeeshop.cms.model.ProductVariant;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.model.enums.OrderStatus;
import com.coffeeshop.cms.repository.OrderRepository;
import com.coffeeshop.cms.repository.ProductVariantRepository;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private UserRepository userRepository;

    public List<OrderDto> getAllOrders() {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public List<OrderDto> getOrdersByStatus(OrderStatus status) {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public List<OrderDto> getOrdersByDateRange(LocalDate startDate, LocalDate endDate) {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public List<OrderDto> getOrdersByCustomer(Long customerId) {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public OrderDto getOrderById(Long id) {
        // TODO: Implement method
        return null;
    }

    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = new Order();
        User user = userRepository.findById(orderDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(orderDto.getTotal());

        List<OrderItem> orderItems = orderDto.getOrderItems().stream().map(itemDto -> {
            OrderItem orderItem = new OrderItem();
            ProductVariant variant = productVariantRepository.findById(itemDto.getProductVariantId()).orElseThrow(() -> new RuntimeException("Product variant not found"));
            orderItem.setProductVariant(variant);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(itemDto.getPrice());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }

    public List<OrderDto> getOrders(OrderStatus status, LocalDate startDate, LocalDate endDate, Long customerId) {
        // TODO: Implement method with filtering
        return Collections.emptyList();
    }

    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setCustomerName(order.getUser().getName());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setStatus(order.getStatus().name());
        orderDto.setTotal(order.getTotal());
        orderDto.setOrderItems(order.getOrderItems().stream().map(this::convertOrderItemToDto).collect(Collectors.toList()));
        return orderDto;
    }

    private OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setProductVariantId(orderItem.getProductVariant().getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setSize(orderItem.getProductVariant().getSize());
        return orderItemDto;
    }
}
