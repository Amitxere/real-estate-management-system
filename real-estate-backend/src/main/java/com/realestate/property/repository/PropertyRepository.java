package com.realestate.property.repository;

import com.realestate.property.entity.Property;
import com.realestate.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwnerId(Long ownerId);
    List<Property> findByOwner(User owner);
}