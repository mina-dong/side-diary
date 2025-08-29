package com.sidediary.side_diary.security;

import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.UserRepository;
import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization"); // Authorization 헤더에서 토큰 추출

        // 토큰이 존재하고 "Bearer "로 시작하는지 확인
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // "Bearer " 부분 제거하여 순수 토큰만 추출
            try {
                // JwtUtil을 사용하여 토큰 유효성 검사
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.getEmailFromToken(token); // 토큰에서 이메일 추출
                    String role = jwtUtil.getRoleFromToken(token);   // 토큰에서 역할 추출

                    // UserRepository를 통해 사용자 정보 조회
                    // 사용자가 없을 경우 UsernameNotFoundException 발생시켜 명확하게 처리
                    User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new UsernameNotFoundException("토큰의 이메일과 일치하는 사용자를 찾을 수 없습니다: " + email));

                    // 사용자 역할(Role)을 기반으로 GrantedAuthority 생성
                    List<GrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority("ROLE_" + role) // Spring Security는 "ROLE_" 접두사 필요
                    );

                    // 인증 객체 생성 (사용자 객체, 비밀번호(null), 권한)
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(user, null, authorities);

                    // SecurityContextHolder에 인증 객체 저장 (현재 요청에 대한 사용자 인증 완료)
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    // 토큰이 유효하지 않을 경우 401 Unauthorized 응답
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
                    return; // 필터 체인 진행 중단
                }
            } catch (UsernameNotFoundException e) {
                // 사용자를 찾지 못한 경우 401 Unauthorized 응답
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                return;
            } catch (Exception e) {
                // 그 외 토큰 검증 중 발생한 예외 처리 (예: 만료된 토큰, 변조된 토큰 등)
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 검증 실패: " + e.getMessage());
                return; // 필터 체인 진행 중단
            }
        }
        // 다음 필터로 요청 전달 (인증이 성공했거나 토큰이 없는 경우)
        filterChain.doFilter(request, response);
    }
}
