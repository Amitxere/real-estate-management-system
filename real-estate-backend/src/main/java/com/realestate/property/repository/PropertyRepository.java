package com.realestate.property.repository;

import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwnerId(Long ownerId);
    List<Property> findByOwner(User owner);

//    @Query(
//            value = "SELECT COUNT(*) FROM properties " +
//                    "WHERE status = 'PENDING_APPROVAL'",
//            nativeQuery = true
//    )
//    long countPendingApprovals();
    List<Property> findByStatus(PropertyStatus status);

    long countByStatus(PropertyStatus status);
}