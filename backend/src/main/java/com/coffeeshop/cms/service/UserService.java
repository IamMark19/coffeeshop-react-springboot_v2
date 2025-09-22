package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.model.enums.Role;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto findOrCreateUser(String email, String name, String googleId) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return convertToDto(existingUser.get());
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setGoogleId(googleId);
            newUser.setRole(Role.CUSTOMER);
            User savedUser = userRepository.save(newUser);
            return convertToDto(savedUser);
        }
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
        return userDto;
    }
}
