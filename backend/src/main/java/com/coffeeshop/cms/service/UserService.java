package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.AuthResponse;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.coffeeshop.cms.dto.RegisterRequestDto;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.model.enums.Role;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public AuthResponse login(UserDto userDto) {
        User user = userRepository.findByGoogleId(userDto.getGoogleId());
        if (user == null) {
            user = new User();
            user.setGoogleId(userDto.getGoogleId());
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user = userRepository.save(user);
        }
        return new AuthResponse(user.getId(), user.getName(), user.getEmail());


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto registerUser(RegisterRequestDto registerRequestDto) {
        if (userRepository.findByEmail(registerRequestDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User newUser = new User();
        newUser.setName(registerRequestDto.getName());
        newUser.setEmail(registerRequestDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        newUser.setRole(Role.CUSTOMER);

        User savedUser = userRepository.save(newUser);
        return convertToDto(savedUser);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDto).orElse(null);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        return userDto;
    }
}
