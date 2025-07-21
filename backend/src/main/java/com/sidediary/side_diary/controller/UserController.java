package com.sidediary.side_diary.controller;

import com.sidediary.side_diary.dto.LoginRequest;
import com.sidediary.side_diary.dto.RegisterRequest;
import com.sidediary.side_diary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private  final UserService userService;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        userService.createUser(request);
        return ResponseEntity.ok("회원가입 성공");
    }
    //로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){
        userService.loginUser(request);
        return  ResponseEntity.ok("로그인 성공");
    }
}
