package com.realestate.property.dto;

import com.realestate.property.entity.Furnishing;
import com.realestate.property.entity.ListingType;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.property.entity.PropertyType;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyResponse {

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
    private Integer floors;
    private Boolean parking;
    private Furnishing furnishing;
    private String address;
    private String city;
    private String state;
    private String country;
    private Double latitude;
    private Double longitude;
    private Long ownerId;
}