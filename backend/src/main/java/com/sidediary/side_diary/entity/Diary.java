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

@Table(name="diaries")

public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(length = 30)
    private String title;

    @Column(length = 200)
    private String content;

    @Enumerated(EnumType.STRING) // DB에 문자열로 저장
    @Column(length = 10)
    private Color background;

    private LocalDateTime createAt;

    @PrePersist
    public void prePersist(){
        this.createAt = LocalDateTime.now();
    }

    public enum Color {
        RED, YELLOW, GREEN, BLUE, PURPLE
    }
}
