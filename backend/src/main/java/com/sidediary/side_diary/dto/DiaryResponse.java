package com.sidediary.side_diary.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryResponse {
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime createAt;
}
