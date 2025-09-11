package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.InventoryLogDto;
import com.coffeeshop.cms.dto.ProductDto;
import com.coffeeshop.cms.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/inventory")
public class AdminInventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/stock")
    public List<ProductDto> getCurrentStockLevels() {
        return inventoryService.getCurrentStockLevels();
    }

    @GetMapping("/low-stock")
    public List<ProductDto> getLowStockAlerts() {
        return inventoryService.getLowStockAlerts();
    }

    @GetMapping("/history")
    public List<InventoryLogDto> getInventoryAdjustmentsHistory() {
        return inventoryService.getInventoryAdjustmentsHistory();
    }
}
