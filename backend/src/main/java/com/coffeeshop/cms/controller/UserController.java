package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.LoginRequestDto;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private GoogleIdTokenVerifier googleIdTokenVerifier;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            GoogleIdToken idToken = googleIdTokenVerifier.verify(loginRequestDto.getIdToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String googleId = payload.getSubject();
                return userService.findOrCreateUser(email, name, googleId);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid ID token");
            }
        } catch (GeneralSecurityException | IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Token verification failed", e);
        }
    }
}