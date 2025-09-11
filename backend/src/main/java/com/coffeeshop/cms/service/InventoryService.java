package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.InventoryLogDto;
import com.coffeeshop.cms.dto.ProductDto;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class InventoryService {

    public List<ProductDto> getCurrentStockLevels() {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public List<ProductDto> getLowStockAlerts() {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public List<InventoryLogDto> getInventoryAdjustmentsHistory() {
        // TODO: Implement method
        return Collections.emptyList();
    }
}
