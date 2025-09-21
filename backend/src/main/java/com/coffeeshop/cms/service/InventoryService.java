package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.InventoryLogDto;
import com.coffeeshop.cms.dto.ProductDto;
import com.coffeeshop.cms.dto.ProductVariantDto;
import com.coffeeshop.cms.model.InventoryLog;
import com.coffeeshop.cms.model.Product;
import com.coffeeshop.cms.repository.InventoryLogRepository;
import com.coffeeshop.cms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryLogRepository inventoryLogRepository;

    private static final int LOW_STOCK_THRESHOLD = 10;

    public List<ProductDto> getCurrentStockLevels() {
        return productRepository.findAll().stream()
                .map(this::convertToProductDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getLowStockAlerts() {
        return productRepository.findAll().stream()
                .filter(product -> product.getVariants().stream()
                        .anyMatch(variant -> variant.getStock() < LOW_STOCK_THRESHOLD))
                .map(this::convertToProductDto)
                .collect(Collectors.toList());
    }

    public List<InventoryLogDto> getInventoryAdjustmentsHistory() {
        return inventoryLogRepository.findAll().stream()
                .map(this::convertToInventoryLogDto)
                .collect(Collectors.toList());
    }

    private ProductDto convertToProductDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setImage(product.getImage());
        productDto.setType(product.getType());
        productDto.setVariants(product.getVariants().stream()
                .map(variant -> {
                    ProductVariantDto variantDto = new ProductVariantDto();
                    variantDto.setId(variant.getId());
                    variantDto.setSize(variant.getSize());
                    variantDto.setPrice(variant.getPrice());
                    variantDto.setStock(variant.getStock());
                    return variantDto;
                })
                .collect(Collectors.toList()));
        return productDto;
    }

    private InventoryLogDto convertToInventoryLogDto(InventoryLog inventoryLog) {
        InventoryLogDto inventoryLogDto = new InventoryLogDto();
        inventoryLogDto.setId(inventoryLog.getId());
        if (inventoryLog.getProductVariant() != null && inventoryLog.getProductVariant().getProduct() != null) {
            inventoryLogDto.setProductId(inventoryLog.getProductVariant().getProduct().getId());
            inventoryLogDto.setProductName(inventoryLog.getProductVariant().getProduct().getName());
        }
        inventoryLogDto.setChangeAmount(inventoryLog.getChangeAmount());
        inventoryLogDto.setUpdatedAt(inventoryLog.getUpdatedAt());
        return inventoryLogDto;
    }
}
