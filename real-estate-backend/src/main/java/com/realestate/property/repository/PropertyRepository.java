package com.realestate.property.repository;

import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwnerId(Long ownerId);
    List<Property> findByOwner(User owner);


    List<Property> findByStatus(PropertyStatus status);

    long countByStatus(PropertyStatus status);
}