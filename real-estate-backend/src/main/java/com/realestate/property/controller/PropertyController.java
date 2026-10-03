package com.realestate.property.controller;

import com.realestate.property.dto.PropertyRequest;
import com.realestate.property.dto.PropertyResponse;
import com.realestate.property.service.PropertyService;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ResponseEntity<PropertyResponse> createProperty(
            @Valid @RequestBody PropertyRequest request) {

        PropertyResponse response =
                propertyService.createProperty(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> getPropertyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                propertyService.getPropertyById(id)
        );
    }

    @GetMapping("/my-properties")
    public ResponseEntity<List<PropertyResponse>> getMyProperties() {

        return ResponseEntity.ok(
                propertyService.getMyProperties()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyResponse> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequest request) {

        return ResponseEntity.ok(
                propertyService.updateProperty(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long id) {

        propertyService.deleteProperty(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PropertyResponse> updatePropertyStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                propertyService.updatePropertyStatus(id, status)
        );
    }
}