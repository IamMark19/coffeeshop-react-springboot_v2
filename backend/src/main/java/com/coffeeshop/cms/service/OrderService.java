package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.*;
import com.coffeeshop.cms.model.Order;
import com.coffeeshop.cms.model.OrderItem;
import com.coffeeshop.cms.model.ProductVariant;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.model.enums.OrderStatus;
import com.coffeeshop.cms.repository.OrderItemRepository;
import com.coffeeshop.cms.repository.OrderRepository;
import com.coffeeshop.cms.repository.ProductVariantRepository;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderDto> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<OrderDto> getOrdersByDateRange(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);
        return orderRepository.findByOrderDateBetween(startDateTime, endDateTime).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<OrderDto> getOrdersByCustomer(Long customerId) {
        User user = userRepository.findById(customerId).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDto(order);
    }

    @Transactional
    public OrderDto createOrder(OrderRequestDto orderRequestDto) {
        Order order = new Order();
        User user = userRepository.findById(orderRequestDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(orderRequestDto.getStatus());

        List<OrderItem> orderItems = orderRequestDto.getItems().stream().map(itemDto -> {
            OrderItem orderItem = new OrderItem();
            ProductVariant variant = productVariantRepository.findById(itemDto.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException("Product variant not found"));

            if (variant.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Not enough stock for product variant: " + variant.getId());
            }

            variant.setStock(variant.getStock() - itemDto.getQuantity());
            // No need to save variant here, transactional context will handle it.

            orderItem.setProductVariant(variant);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(variant.getPrice());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        BigDecimal total = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setOrderItems(orderItems);
        order.setTotal(total);

        Order savedOrder = orderRepository.save(order);

        return convertToDto(savedOrder);
    }

    public List<OrderDto> getOrders(OrderStatus status, LocalDate startDate, LocalDate endDate, Long customerId) {
        if (status != null) {
            return getOrdersByStatus(status);
        }
        if (startDate != null && endDate != null) {
            return getOrdersByDateRange(startDate, endDate);
        }
        if (customerId != null) {
            return getOrdersByCustomer(customerId);
        }
        return orderRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());

        if (order.getUser() != null) {
            CustomerDto customerDto = new CustomerDto();
            customerDto.setId(order.getUser().getId());
            customerDto.setName(order.getUser().getName());
            customerDto.setAddress(order.getUser().getAddress());
            if (order.getUser().getCoordinates() != null) {
                LatLngDto latLngDto = new LatLngDto();
                latLngDto.setLat(order.getUser().getCoordinates().getLat());
                latLngDto.setLng(order.getUser().getCoordinates().getLng());
                customerDto.setCoordinates(latLngDto);
            }
            orderDto.setCustomer(customerDto);
        }

        orderDto.setItems(order.getOrderItems().stream().map(this::convertOrderItemToDto).collect(Collectors.toList()));
        orderDto.setTotalPayment(order.getTotal());
        orderDto.setDate(order.getOrderDate());
        if (order.getStatus() != null) {
            orderDto.setStatus(order.getStatus().name());
        }

        return orderDto;
    }

    private OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setProductId(orderItem.getProductVariant().getProduct().getId());
        orderItemDto.setProductName(orderItem.getProductVariant().getProduct().getName());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setSize(orderItem.getProductVariant().getSize());
        return orderItemDto;
    }
}
