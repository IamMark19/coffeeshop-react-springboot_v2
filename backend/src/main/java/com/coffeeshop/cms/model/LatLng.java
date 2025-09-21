package com.coffeeshop.cms.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LatLng {
    private Double lat;
    private Double lng;
}
