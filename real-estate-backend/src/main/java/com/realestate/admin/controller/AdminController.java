package com.realestate.admin.controller;

import com.realestate.admin.dto.AdminResponse;
import com.realestate.admin.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminResponse> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboardStats()
        );
    }
}