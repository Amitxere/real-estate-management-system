package com.realestate.property.mapper;

import com.realestate.property.dto.PropertyRequest;
import com.realestate.property.dto.PropertyResponse;
import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public Property toEntity(PropertyRequest request) {

        return Property.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .propertyType(request.getPropertyType())
                .listingType(request.getListingType())
                .price(request.getPrice())
                .bedrooms(request.getBedrooms())
                .bathrooms(request.getBathrooms())
                .area(request.getArea())
                .floors(request.getFloors())
                .parking(request.getParking())
                .furnishing(request.getFurnishing())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .status(PropertyStatus.PENDING_APPROVAL)
                .build();
    }

    public PropertyResponse toResponse(Property property) {

        return PropertyResponse.builder()
                .id(property.getId())
                .title(property.getTitle())
                .description(property.getDescription())
                .propertyType(property.getPropertyType())
                .listingType(property.getListingType())
                .price(property.getPrice())
                .status(property.getStatus())
                .bedrooms(property.getBedrooms())
                .bathrooms(property.getBathrooms())
                .area(property.getArea())
                .floors(property.getFloors())
                .parking(property.getParking())
                .furnishing(property.getFurnishing())
                .address(property.getAddress())
                .city(property.getCity())
                .state(property.getState())
                .country(property.getCountry())
                .latitude(property.getLatitude())
                .longitude(property.getLongitude())
                .ownerId(property.getOwner().getId())
                .build();
    }
}