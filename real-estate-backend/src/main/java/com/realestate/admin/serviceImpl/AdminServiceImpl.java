package com.realestate.admin.serviceImpl;

import com.realestate.admin.dto.AdminResponse;
import com.realestate.admin.service.AdminService;
import com.realestate.property.entity.PropertyStatus;
import com.realestate.property.repository.PropertyRepository;
import com.realestate.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl
        implements AdminService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;


    @Override
    public AdminResponse getDashboardStats() {

        return AdminResponse.builder()
                .totalUsers(userRepository.count())
                .totalProperties(propertyRepository.count())
                .pendingApprovals(
                        propertyRepository.countByStatus(
                                PropertyStatus.PENDING_APPROVAL
                        )
                )
                .build();
    }
}