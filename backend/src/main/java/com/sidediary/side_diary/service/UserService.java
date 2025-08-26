package com.sidediary.side_diary.service;

import com.sidediary.side_diary.dto.LoginRequest;
import com.sidediary.side_diary.dto.RegisterRequest;
import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.UserRepository;
import com.sidediary.side_diary.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor //final 사용하려면 생성자를 사용해야하는데, 롬복기능으로 대체
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화
    private final JwtUtil jwtUtil; // JWT 발급용 (직접 만든 클래스)

    //회원가입
    public User createUser(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("이미 존재하는 이메일");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // 암호화 적용
                .nickname(request.getNickname())
                .build();

        return userRepository.save(user);

    }

    // 이메일로 사용자 조회 - 무슨 기능인지 헷갈려서 주석처리
     public Optional<User> getUserByEmail(String email){
      return userRepository.findByEmail(email);
    }


    // 로그인 & JWT 발급
    public String loginUser (LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 이메일"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호 불일치");
        }

        // JWT 발급
        return jwtUtil.generateToken(user.getEmail());
    }
}
