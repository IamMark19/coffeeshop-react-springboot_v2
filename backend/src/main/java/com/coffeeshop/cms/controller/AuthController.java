package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.LoginRequestDto;
import com.coffeeshop.cms.dto.RegisterRequestDto;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        UserDto userDto = userService.registerUser(registerRequestDto);
        return ResponseEntity.ok(userDto);
    }

}