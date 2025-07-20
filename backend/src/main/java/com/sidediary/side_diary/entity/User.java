package com.sidediary.side_diary.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter

@NoArgsConstructor //기본 생성자 파라미터 하나도 없는거
@AllArgsConstructor // 모든필드
@Builder // 필드별로 값을 지정해서 골라서 넣을 수 있음

@Table(name="users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String nickname;

    private LocalDateTime createAt;

    @PrePersist
    public void prePresist(){
        this.createAt = LocalDateTime.now();
    }
}
