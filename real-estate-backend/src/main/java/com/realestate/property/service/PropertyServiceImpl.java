package com.realestate.property.service;

import com.realestate.property.dto.PropertyRequest;
import com.realestate.property.dto.PropertyResponse;
import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.property.mapper.PropertyMapper;
import com.realestate.property.repository.PropertyRepository;
import com.realestate.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    @Override
    public PropertyResponse createProperty(PropertyRequest request) {

        Property property = propertyMapper.toEntity(request);

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User owner = (User) authentication.getPrincipal();

        property.setOwner(owner);
        property.setOwnerEmail(owner.getEmail());

        Property savedProperty =
                propertyRepository.save(property);

        return propertyMapper.toResponse(savedProperty);
    }

    @Override
    public PropertyResponse getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Property not found with id: " + id));

        return propertyMapper.toResponse(property);
    }

    @Override
    public List<PropertyResponse> getMyProperties() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User owner = (User) authentication.getPrincipal();

        return propertyRepository.findByOwner(owner)
                .stream()
                .map(propertyMapper::toResponse)
                .toList();
    }

    @Override
    public PropertyResponse updateProperty(
            Long id,
            PropertyRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User owner = (User) authentication.getPrincipal();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Property not found with id: " + id));

        // Check ownership
        if (!property.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException(
                    "You are not allowed to update this property");
        }

        // Update property details
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPropertyType(request.getPropertyType());
        property.setListingType(request.getListingType());
        property.setPrice(request.getPrice());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setArea(request.getArea());
        property.setFloors(request.getFloors());
        property.setParking(request.getParking());
        property.setFurnishing(request.getFurnishing());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setCountry(request.getCountry());
        property.setLatitude(request.getLatitude());
        property.setLongitude(request.getLongitude());

        // Keep owner unchanged
        property.setOwner(owner);
        property.setOwnerEmail(owner.getEmail());

        // Do NOT change status during normal property update

        Property updatedProperty =
                propertyRepository.save(property);

        return propertyMapper.toResponse(updatedProperty);
    }

    @Override
    public void deleteProperty(Long id) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User owner = (User) authentication.getPrincipal();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Property not found with id: " + id));

        // Check ownership
        if (!property.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException(
                    "You are not allowed to delete this property");
        }

        propertyRepository.delete(property);
    }

    @Override
    public PropertyResponse updatePropertyStatus(
            Long id,
            String status) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User owner = (User) authentication.getPrincipal();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Property not found with id: " + id));

        if (!property.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException(
                    "You are not allowed to update this property");
        }


        PropertyStatus newStatus;

        try {
            newStatus = PropertyStatus.valueOf(
                    status.toUpperCase()
            );
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                    "Invalid property status: " + status);
        }

        property.setStatus(newStatus);

        Property updatedProperty =
                propertyRepository.save(property);

        return propertyMapper.toResponse(updatedProperty);
    }
}