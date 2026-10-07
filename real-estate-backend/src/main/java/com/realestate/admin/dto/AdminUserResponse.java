package com.realestate.admin.dto;

import com.realestate.user.entity.User;
import com.realestate.user.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {

    private Long id;
    private String username;
    private String email;
    private String mobileNumber;
    private UserRole role;
    private boolean enabled;

    public static AdminUserResponse fromEntity(User user) {
        return AdminUserResponse.builder()
                .id(user.getId())
//                .username(user.getUsername())
                .username(user.getDisplayUsername())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .role(user.getRole())
                .enabled(user.isEnabled())
                .build();
    }
}