package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.ProductDto;
import com.coffeeshop.cms.dto.ProductVariantDto;
import com.coffeeshop.cms.model.Product;
import com.coffeeshop.cms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    private ProductDto convertToDto(Product product) {
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
}
