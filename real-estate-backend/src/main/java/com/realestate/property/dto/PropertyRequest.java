package com.realestate.property.dto;

import com.realestate.property.entity.Furnishing;
import com.realestate.property.entity.ListingType;
import com.realestate.property.entity.PropertyType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must not exceed 150 characters")
    private String title;

    @Size(max = 3000, message = "Description must not exceed 3000 characters")
    private String description;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    @NotNull(message = "Listing type is required")
    private ListingType listingType;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private BigDecimal price;

    @Min(value = 0, message = "Bedrooms cannot be negative")
    private Integer bedrooms;

    @Min(value = 0, message = "Bathrooms cannot be negative")
    private Integer bathrooms;

    @Positive(message = "Area must be greater than zero")
    private Double area;

    @Min(value = 0, message = "Floors cannot be negative")
    private Integer floors;

    private Boolean parking;

    private Furnishing furnishing;

    private String address;
    private String city;
    private String state;
    private String country;
    private Double latitude;
    private Double longitude;
}