package com.realestate.admin.serviceImpl;

import com.realestate.admin.dto.AdminPropertyResponse;
import com.realestate.admin.service.AdminPropertyService;
import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.property.repository.PropertyRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPropertyServiceImpl
        implements AdminPropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AdminPropertyResponse> getAllProperties() {

        return propertyRepository.findAll()
                .stream()
                .map(AdminPropertyResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AdminPropertyResponse getPropertyById(Long id) {

        Property property = findProperty(id);

        return AdminPropertyResponse.fromEntity(property);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminPropertyResponse> getPendingProperties() {

        return propertyRepository
                .findByStatus(PropertyStatus.PENDING_APPROVAL)
                .stream()
                .map(AdminPropertyResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public AdminPropertyResponse approveProperty(Long id) {

        Property property = findProperty(id);

        if (property.getStatus()
                != PropertyStatus.PENDING_APPROVAL) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only pending properties can be approved"
            );
        }

        property.setStatus(PropertyStatus.ACTIVE);

        Property updatedProperty =
                propertyRepository.save(property);

        return AdminPropertyResponse
                .fromEntity(updatedProperty);
    }

    @Override
    @Transactional
    public AdminPropertyResponse rejectProperty(Long id) {

        Property property = findProperty(id);

        if (property.getStatus()
                != PropertyStatus.PENDING_APPROVAL) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only pending properties can be rejected"
            );
        }

        property.setStatus(PropertyStatus.REJECTED);

        Property updatedProperty =
                propertyRepository.save(property);

        return AdminPropertyResponse
                .fromEntity(updatedProperty);
    }

    private Property findProperty(Long id) {

        return propertyRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Property not found with ID: " + id
                        )
                );
    }
}