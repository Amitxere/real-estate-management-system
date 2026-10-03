package com.realestate.user.dto;

import com.realestate.user.entity.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String username;

    private String email;

    private String mobileNumber;

    private UserRole role;

    private boolean enabled;
}