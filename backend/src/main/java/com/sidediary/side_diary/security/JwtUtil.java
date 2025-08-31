package com.sidediary.side_diary.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME; // 밀리초 단위

    // SecretKey 객체 생성
    private SecretKey getSigningKey() {
        // HS256 서명에 필요한 최소 길이(32바이트)를 확인합니다.
        if (SECRET_KEY == null || SECRET_KEY.length() < 32) {
            throw new IllegalArgumentException("JWT secret key must be at least 32 characters (256 bits) long.");
        }
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // JWT 생성 (이메일, 닉네임, 역할 포함)
    public String generateToken(Long id, String email, String nickname, String role) { // role 파라미터 추가
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email) // 토큰의 주체 (여기서는 사용자 이메일)
                .claim("id", id)             // [수정] payload에 ID 추가
                .claim("nickname", nickname)    // payload에 닉네임 추가
                .claim("role", role)            // payload에 역할(role) 추가 (필수)
                .setIssuedAt(now)               // 발행 시간
                .setExpiration(expiryDate)      // 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명 알고리즘 및 키
                .compact(); // 토큰 생성
    }

    // JWT에서 클레임(Claim) 추출을 위한 공통 메소드
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // JWT에서 이메일 추출
    public String getEmailFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    // JWT에서 닉네임 추출 (필요하다면)
    public String getNicknameFromToken(String token) {
        return (String) getAllClaimsFromToken(token).get("nickname");
    }

    // JWT에서 역할 추출 (필수)
    public String getRoleFromToken(String token) {
        return (String) getAllClaimsFromToken(token).get("role");
    }

    // JWT 유효성 검사
    public boolean validateToken(String token) {
        try {
            getAllClaimsFromToken(token); // 토큰 파싱 시 유효성 검사 (만료 여부, 서명 등)
            return true;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            // 서명이 일치하지 않을 때
            System.err.println("Invalid JWT signature: " + e.getMessage());
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            // 유효하지 않은 JWT 구조
            System.err.println("Invalid JWT token: " + e.getMessage());
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            // 만료된 JWT
            System.err.println("JWT token is expired: " + e.getMessage());
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            // 지원되지 않는 JWT 형식
            System.err.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // JWT 클레임 문자열이 비어있을 때
            System.err.println("JWT claims string is empty: " + e.getMessage());
        }
        return false;
    }
}
