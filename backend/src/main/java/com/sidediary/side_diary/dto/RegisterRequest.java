package com.sidediary.side_diary.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@ToString 디버깅용
public class RegisterRequest {
    private String email;
    private String password;
    private String nickname;
    private String invitationCode;
}
