package com.sidediary.side_diary.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (Postman 테스트용)
                .authorizeHttpRequests(authorize -> authorize
                        // 회원가입과 로그인 경로는 인증 없이 접근을 허용합니다.
                        .requestMatchers("/users/register", "/users/login").permitAll()
                        // 그 외 모든 요청은 인증된 사용자만 접근할 수 있도록 합니다.
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
