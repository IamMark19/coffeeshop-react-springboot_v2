package com.coffeeshop.cms.controller;

import com.coffeeshop.cms.dto.LoginRequestDto;
import com.coffeeshop.cms.dto.LoginResponseDto;
import com.coffeeshop.cms.dto.RegisterRequestDto;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.service.UserDetailsServiceImpl;
import com.coffeeshop.cms.service.UserService;
import com.coffeeshop.cms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDto> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        UserDto userDto = userService.registerUser(registerRequestDto);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(userDto.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new LoginResponseDto(jwt, userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDto.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        User user = userService.findByEmail(loginRequestDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());

        return ResponseEntity.ok(new LoginResponseDto(jwt, userDto));
    }
}