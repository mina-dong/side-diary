package com.sidediary.side_diary.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter

@NoArgsConstructor //기본 생성자 파라미터 하나도 없는거
@AllArgsConstructor // 모든필드
@Builder // 필드별로 값을 지정해서 골라서 넣을 수 있음

@Table(name="users")

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 30)
    private String nickname;

    @Enumerated(EnumType.STRING) // Enum 타입을 DB에 문자열("USER", "ADMIN" 등)로 저장
    @Column(nullable = false)
    private UserRole role; // 사용자 역할 필드

    private LocalDateTime createAt;

    @PrePersist
    public void prePersist(){
        this.createAt = LocalDateTime.now();
    }

    // --- Spring Security UserDetails 인터페이스 구현 메소드 ---
    // 토이 프로젝트이므로 필수적인 메소드들만 간략하게 구현합니다.

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자의 역할을 기반으로 권한 목록을 반환합니다.
        // Spring Security는 "ROLE_" 접두사가 붙은 권한 이름을 사용합니다.
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        // Spring Security에서 사용자의 고유 ID로 사용될 값을 반환합니다.
        // 여기서는 이메일을 로그인 ID로 사용하므로 이메일을 반환합니다.
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // 계정 만료 여부 (true: 만료되지 않음) - 토이 프로젝트이므로 항상 true
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금 여부 (true: 잠금되지 않음) - 토이 프로젝트이므로 항상 true
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 비밀번호 만료 여부 (true: 만료되지 않음) - 토이 프로젝트이므로 항상 true
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정 활성화 여부 (true: 활성화됨) - 토이 프로젝트이므로 항상 true
        return true;
    }

    //enum 타입 관리자
    public enum UserRole {
        USER, 
        ADMIN 
    }
}
