package com.sidediary.side_diary.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginRequest {
    private String email;
    private String password;
}
