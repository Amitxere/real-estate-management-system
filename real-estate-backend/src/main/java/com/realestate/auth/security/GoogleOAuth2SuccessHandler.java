package com.realestate.auth.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.realestate.user.repository.UserRepository

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class GoogleOAuth2SuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;


    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User googleUser =
                (OAuth2User) authentication.getPrincipal();

        String email = googleUser.getAttribute("email");
        String name = googleUser.getAttribute("name");
        Boolean emailVerified =
                googleUser.getAttribute("email_verified");

        if (email == null || email.isBlank()
                || !Boolean.TRUE.equals(emailVerified)) {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "A verified Google email is required."
            );
            return;
        }

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .username(
                                    name != null && !name.isBlank()
                                            ? name : email
                            )
                            .email(email)
                            .password(new BCryptPasswordEncoder().encode(
                                    UUID.randomUUID().toString()
                            ))
                            .role(UserRole.ADMIN)
                            .enabled(true)
                            .build();

                    return userRepository.save(newUser);
                });

        if (!user.isEnabled()) {
            response.sendError(
                    HttpServletResponse.SC_FORBIDDEN,
                    "Your account is disabled."
            );
            return;
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        String redirectUrl = frontendUrl
                + "/oauth2/callback#token=" + token
                + "&role=" + user.getRole().name();

        response.sendRedirect(redirectUrl);
    }
}
