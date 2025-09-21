package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.SalesData;
import com.coffeeshop.cms.model.Order;
import com.coffeeshop.cms.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportingService {

    @Autowired
    private OrderRepository orderRepository;

    public List<SalesData> getDailySalesReport() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        List<Order> orders = orderRepository.findByOrderDateBetween(startOfDay, endOfDay);
        return processSalesData(orders);
    }

    public List<SalesData> getWeeklySalesReport() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Order> orders = orderRepository.findByOrderDateAfter(sevenDaysAgo);
        return processSalesData(orders);
    }

    public List<SalesData> getMonthlySalesReport() {
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        List<Order> orders = orderRepository.findByOrderDateAfter(startOfMonth);
        return processSalesData(orders);
    }

    private List<SalesData> processSalesData(List<Order> orders) {
        return orders.stream()
                .collect(Collectors.groupingBy(order -> order.getOrderDate().toLocalDate()))
                .entrySet().stream()
                .map(entry -> {
                    SalesData salesData = new SalesData();
                    salesData.setDate(entry.getKey());
                    salesData.setTotalOrders((long) entry.getValue().size());
                    salesData.setTotalSales(entry.getValue().stream()
                            .map(Order::getTotal)
                            .reduce(BigDecimal.ZERO, BigDecimal::add));
                    return salesData;
                })
                .collect(Collectors.toList());
    }
}
