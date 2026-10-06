package com.realestate.admin.serviceImpl;

import com.realestate.admin.dto.AdminUserResponse;
import com.realestate.admin.service.AdminUserService;
import com.realestate.user.entity.UserRole;
import com.realestate.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    @Override
    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(AdminUserResponse::fromEntity)
                .toList();
    }
    @Override
    public AdminUserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(AdminUserResponse::fromEntity)
                .orElseThrow(() ->
                        new org.springframework.web.server
                                .ResponseStatusException(
                                org.springframework.http.HttpStatus.NOT_FOUND,
                                "User not found with ID: " + id
                        )
                );
    }
    @Override
    public List<AdminUserResponse> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role)
                .stream()
                .map(AdminUserResponse::fromEntity)
                .toList();
    }
    @Override
    @Transactional
    public AdminUserResponse updateUserStatus(
            Long id, boolean enabled) {

        var user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found with ID: " + id
                ));

        user.setEnabled(enabled);

        var updatedUser = userRepository.save(user);

        return AdminUserResponse.fromEntity(updatedUser);
    }
}