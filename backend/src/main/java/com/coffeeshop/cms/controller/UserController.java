package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserDto getMe(@AuthenticationPrincipal Jwt jwt) {
        String googleId = jwt.getSubject();
        String email = jwt.getClaim("email");
        String name = jwt.getClaim("name");
        return userService.findOrCreateUser(email, name, googleId);
    }
}