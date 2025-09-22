package com.coffeeshop.cms.model;

import com.coffeeshop.cms.model.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import jakarta.persistence.Embedded;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String googleId;
    private String password;
    private String address;

    @Embedded
    private LatLng coordinates;

    @Enumerated(EnumType.STRING)
    private Role role;
}
