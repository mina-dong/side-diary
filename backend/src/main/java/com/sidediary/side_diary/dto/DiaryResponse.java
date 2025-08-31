package com.sidediary.side_diary.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryResponse {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String userNickname;
    private LocalDateTime createAt;
    private String background;
}

