package com.coffeeshop.cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/geocoding")
public class GeoCodingController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org";

    @GetMapping("/reverse")
    public ResponseEntity<String> reverseGeocode(@RequestParam("lat") double lat, @RequestParam("lon") double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL + "/reverse")
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("format", "json")
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam("q") String query) {
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL + "/search")
                .queryParam("q", query)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }
}
