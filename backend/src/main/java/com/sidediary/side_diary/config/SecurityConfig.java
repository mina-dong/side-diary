package com.sidediary.side_diary.config;

import com.sidediary.side_diary.repository.UserRepository;
import com.sidediary.side_diary.security.JwtAuthenticationFilter;
import com.sidediary.side_diary.security.JwtUtil;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity// @PreAuthorize 등의 어노테이션 사용 활성화 - 컨트롤러에 있음
public class SecurityConfig {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public SecurityConfig(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (Postman 테스트용)
                .headers(headers ->
                        headers.addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
                ) // H2 콘솔을 위해 frameOptions 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        // 회원가입과 로그인 경로는 인증 없이 접근을 허용합니다.
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                        // 글쓰기 API (예시: /api/posts에 POST 요청)는 ROLE_USER 또는 ROLE_ADMIN 권한이 필요
                        .requestMatchers(HttpMethod.POST, "/api/diaries").hasAnyRole("USER", "ADMIN")
                        // 그 외 모든 요청은 인증된 사용자만 접근할 수 있도록 합니다.
                        .anyRequest().authenticated()
                )
                // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 이전에 추가합니다. (이 라인이 매우 중요!) - 403 에러
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, userRepository);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // H2 콘솔 무시 설정 (Security 적용 없이 접근 가능)
    @Bean
    @ConditionalOnProperty(name = "spring.h2.console.enabled", havingValue = "true")
    public WebSecurityCustomizer h2ConsoleCustomizer() {
        return web -> web.ignoring().requestMatchers(PathRequest.toH2Console());
    }
}
