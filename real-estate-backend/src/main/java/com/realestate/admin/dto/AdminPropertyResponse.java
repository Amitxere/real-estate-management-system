package com.realestate.admin.dto;

import com.realestate.property.entity.ListingType;
import com.realestate.property.entity.Property;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.property.entity.PropertyType;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPropertyResponse {

    private Long id;
    private String title;
    private String description;

    private PropertyType propertyType;
    private ListingType listingType;

    private BigDecimal price;
    private PropertyStatus status;

    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;

    private String address;
    private String city;
    private String state;
    private String country;

    private Long ownerId;
    private String ownerEmail;

    public static AdminPropertyResponse fromEntity(Property property) {

        return AdminPropertyResponse.builder()
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
                .address(property.getAddress())
                .city(property.getCity())
                .state(property.getState())
                .country(property.getCountry())
                .ownerId(
                        property.getOwner() != null
                                ? property.getOwner().getId()
                                : null
                )
                .ownerEmail(property.getOwnerEmail())
                .build();
    }
}