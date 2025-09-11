package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.SalesData;
import com.coffeeshop.cms.service.ReportingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/sales")
public class AdminSalesController {

    @Autowired
    private ReportingService reportingService;

    @GetMapping("/daily")
    public List<SalesData> getDailySalesReport() {
        return reportingService.getDailySalesReport();
    }

    @GetMapping("/weekly")
    public List<SalesData> getWeeklySalesReport() {
        return reportingService.getWeeklySalesReport();
    }

    @GetMapping("/monthly")
    public List<SalesData> getMonthlySalesReport() {
        return reportingService.getMonthlySalesReport();
    }
}
