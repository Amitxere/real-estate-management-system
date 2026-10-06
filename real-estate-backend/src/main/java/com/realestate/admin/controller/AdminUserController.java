package com.realestate.admin.controller;

import com.realestate.admin.dto.AdminUserResponse;
import com.realestate.admin.dto.UpdateUserStatusRequest;
import com.realestate.admin.service.AdminUserService;

import com.realestate.user.entity.UserRole;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.Data;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<List<AdminUserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdminUserResponse> getUserById(
            @org.springframework.web.bind.annotation.PathVariable Long id) {

        return ResponseEntity.ok(
                adminUserService.getUserById(id)
        );
    }
    @GetMapping("/role/{role}")
    public ResponseEntity<List<AdminUserResponse>> getUsersByRole(
            @PathVariable UserRole role) {

        return ResponseEntity.ok(
                adminUserService.getUsersByRole(role)
        );
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdminUserResponse> updateUserStatus(
            @PathVariable Long id,
            @RequestBody UpdateUserStatusRequest request) {

        return ResponseEntity.ok(
                adminUserService.updateUserStatus(
                        id, request.isEnabled()
                )
        );
    }
}