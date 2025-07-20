package com.sidediary.side_diary.service;

import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor //final 사용하려면 생성자를 사용해야하는데, 롬복기능으로 대체
public class UserService {
    private final UserRepository userRepository;

    public User createUser(User user){
        if (userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new IllegalArgumentException("이미 존재하는 이메일");
        }
        return userRepository.save(user);

    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
