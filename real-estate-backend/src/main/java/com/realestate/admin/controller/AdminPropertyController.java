package com.realestate.admin.controller;

import com.realestate.admin.dto.AdminPropertyResponse;
import com.realestate.admin.service.AdminPropertyService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/properties")
@RequiredArgsConstructor
public class AdminPropertyController {

    private final AdminPropertyService adminPropertyService;

    @GetMapping
    public ResponseEntity<List<AdminPropertyResponse>>
    getAllProperties() {

        return ResponseEntity.ok(
                adminPropertyService.getAllProperties()
        );
    }

    @GetMapping("/pending")
    public ResponseEntity<List<AdminPropertyResponse>>
    getPendingProperties() {

        return ResponseEntity.ok(
                adminPropertyService.getPendingProperties()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminPropertyResponse>
    getPropertyById(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminPropertyService.getPropertyById(id)
        );
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<AdminPropertyResponse>
    approveProperty(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminPropertyService.approveProperty(id)
        );
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<AdminPropertyResponse>
    rejectProperty(@PathVariable Long id) {

        return ResponseEntity.ok(
                adminPropertyService.rejectProperty(id)
        );
    }
}