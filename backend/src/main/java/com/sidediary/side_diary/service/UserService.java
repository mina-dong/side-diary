package com.sidediary.side_diary.service;

import com.sidediary.side_diary.dto.RegisterRequest;
import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor //final 사용하려면 생성자를 사용해야하는데, 롬복기능으로 대체
public class UserService {
    private final UserRepository userRepository;

    public User createUser(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("이미 존재하는 이메일");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword()) // 나중에 암호화
                .nickname(request.getNickname())
                .build();

        return userRepository.save(user);

    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
