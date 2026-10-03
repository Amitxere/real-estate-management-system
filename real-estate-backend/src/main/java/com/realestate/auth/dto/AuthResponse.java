package com.realestate.auth.dto;

import com.realestate.user.entity.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String accessToken;

    private String tokenType;

    private Long userId;

    private String username;

    private String email;

    private UserRole role;
}