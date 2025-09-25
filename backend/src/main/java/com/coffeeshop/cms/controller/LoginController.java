package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.login(userDto));
    }
}