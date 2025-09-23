package com.coffeeshop.cms.controller;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeeshop.cms.dto.LoginRequestDto;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginRequestDto loginRequestDto) {
        return userService.findOrCreateUser(loginRequestDto.getEmail(), loginRequestDto.getName(), loginRequestDto.getGoogleId());
    }

    @GetMapping("/ping-google")
    public String pingGoogle() {
        String urlToPing = "https://www.google.com";
        logger.info("Attempting to ping URL: {}", urlToPing);
        try {
            URL url = new URL(urlToPing);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000); // 5 seconds
            connection.setReadTimeout(5000);

            int responseCode = connection.getResponseCode();
            logger.info("Ping successful. Response code: {}", responseCode);
            return "SUCCESS: Connected to " + urlToPing + " with response code " + responseCode;
        } catch (IOException e) {
            logger.error("Ping failed: Could not connect to {}. Error: {}", urlToPing, e.getMessage());
            e.printStackTrace();
            return "FAILED: Could not connect to " + urlToPing + ". Check server logs for details. Error: " + e.getMessage();
        }
    }
}