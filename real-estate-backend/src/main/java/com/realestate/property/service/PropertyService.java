package com.realestate.property.service;

import com.realestate.property.dto.PropertyRequest;
import com.realestate.property.dto.PropertyResponse;
import com.realestate.property.entity.Property;
import com.realestate.user.entity.User;

import java.util.List;

public interface PropertyService {

    PropertyResponse createProperty(PropertyRequest request);

    PropertyResponse getPropertyById(Long id);

    List<PropertyResponse> getMyProperties();

    PropertyResponse updateProperty(Long id, PropertyRequest request);

    void deleteProperty(Long id);

    PropertyResponse updatePropertyStatus(Long id, String status);
}