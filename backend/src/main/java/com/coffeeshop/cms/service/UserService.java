package com.coffeeshop.cms.service;

import com.coffeeshop.cms.dto.AuthResponse;
import com.coffeeshop.cms.dto.UserDto;
import com.coffeeshop.cms.model.User;
import com.coffeeshop.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

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
    }

    public List<UserDto> getAllUsers() {
        // TODO: Implement method
        return Collections.emptyList();
    }

    public UserDto getUserById(Long id) {
        // TODO: Implement method
        return null;
    }
}
