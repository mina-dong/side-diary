package com.sidediary.side_diary;

import com.sidediary.side_diary.entity.Diary;
import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.DiaryRepository;
import com.sidediary.side_diary.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("dev")
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, DiaryRepository diaryRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.diaryRepository = diaryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 관리자 계정 생성
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User adminUser = new User();
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("admin1234"));
            adminUser.setRole(User.UserRole.ADMIN);
            adminUser.setNickname("관리자");
            userRepository.save(adminUser);
            System.out.println("관리자 계정이 자동으로 생성되었습니다.");
        }

        // 예시 다이어리 데이터 생성
        userRepository.findByEmail("admin@example.com").ifPresent(adminUser -> {
            if (diaryRepository.countByUser(adminUser) == 0) {
                Diary diary1 = Diary.builder()
                        .title("첫 번째 다이어리")
                        .content("자동으로 생성된 첫 번째 다이어리 내용입니다.")
                        .user(adminUser)
                        .background("blue")
                        .build();

                Diary diary2 = Diary.builder()
                        .title("두 번째 다이어리")
                        .content("두 번째 다이어리 내용입니다.")
                        .user(adminUser)
                        .background("red")
                        .build();

                diaryRepository.saveAll(List.of(diary1, diary2));
                System.out.println("예시 다이어리 데이터가 생성되었습니다.");
            }
        });
    }
}