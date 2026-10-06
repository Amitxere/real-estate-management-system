package com.realestate.admin.service;

import com.realestate.admin.dto.AdminPropertyResponse;

import java.util.List;

public interface AdminPropertyService {

    List<AdminPropertyResponse> getAllProperties();

    AdminPropertyResponse getPropertyById(Long id);

    List<AdminPropertyResponse> getPendingProperties();

    AdminPropertyResponse approveProperty(Long id);

    AdminPropertyResponse rejectProperty(Long id);
}