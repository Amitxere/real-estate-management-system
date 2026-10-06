package com.realestate.admin.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponse {

    private long totalUsers;
    private long totalProperties;
    private long pendingApprovals;
}