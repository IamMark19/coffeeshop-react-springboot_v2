package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.OrderDto;
import com.coffeeshop.cms.dto.OrderItemDto;
import com.coffeeshop.cms.model.Order;
import com.coffeeshop.cms.model.OrderItem;
import com.coffeeshop.cms.model.ProductVariant;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.model.enums.OrderStatus;
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

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

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
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = new Order();
        User user = userRepository.findById(orderDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(orderDto.getTotal());
        order.setOrderItems(Collections.emptyList());

        // Save the order first to get an ID
        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItems = orderDto.getOrderItems().stream().map(itemDto -> {
            OrderItem orderItem = new OrderItem();
            ProductVariant variant = productVariantRepository.findById(itemDto.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException("Product variant not found"));

            // Check stock
            if (variant.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Not enough stock for product variant: " + variant.getId());
            }

            // Decrease stock
            variant.setStock(variant.getStock() - itemDto.getQuantity());
            productVariantRepository.save(variant);

            orderItem.setProductVariant(variant);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(itemDto.getPrice());
            orderItem.setOrder(savedOrder); // Set the saved order
            return orderItemRepository.save(orderItem);
        }).collect(Collectors.toList());

        savedOrder.setOrderItems(orderItems);

        return convertToDto(savedOrder);
    }

    public List<OrderDto> getOrders(OrderStatus status, LocalDate startDate, LocalDate endDate, Long customerId) {
        // This is a simple implementation. A more advanced implementation would use Specifications or Querydsl.
        if (status != null) {
            return getOrdersByStatus(status);
        }
        if (startDate != null && endDate != null) {
            return getOrdersByDateRange(startDate, endDate);
        }
        if (customerId != null) {
            return getOrdersByCustomer(customerId);
        }
        return getAllOrders();
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
