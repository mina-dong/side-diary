package com.sidediary.side_diary.repository;


import com.sidediary.side_diary.entity.Diary;
import com.sidediary.side_diary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    long countByUser(User user);
}
