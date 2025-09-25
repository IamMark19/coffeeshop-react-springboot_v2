package com.coffeeshop.cms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coffeeshop.cms.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByGoogleId(String googleId);

    Optional<User> findByEmail(String email);
}
