package com.realestate.admin.service;

import com.realestate.admin.dto.AdminUserResponse;
import com.realestate.user.entity.UserRole;

import java.util.List;

public interface AdminUserService {

    List<AdminUserResponse> getAllUsers();
    AdminUserResponse getUserById(Long id);
    List<AdminUserResponse> getUsersByRole(UserRole role);
    AdminUserResponse updateUserStatus(Long id, boolean enabled);
}