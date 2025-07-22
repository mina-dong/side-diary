package com.sidediary.side_diary.service;

import com.sidediary.side_diary.dto.DiaryRequest;
import com.sidediary.side_diary.dto.DiaryResponse;
import com.sidediary.side_diary.entity.Diary;
import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.DiaryRepository;
import com.sidediary.side_diary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    //작성서비스
    public Diary createDiary(DiaryRequest request){
        User user = userRepository.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        Diary diary = Diary.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .build();

        return diaryRepository.save(diary);
    }

    // 전체 조회
    public List<DiaryResponse> findAllDiaries() {
        List<Diary> diaries = diaryRepository.findAll();
        List<DiaryResponse> diaryResponses = new ArrayList<>(); //리스트 선언

        for (Diary diary : diaries) {
            DiaryResponse responseDto = convertToResponseDto(diary);
            diaryResponses.add(responseDto);
        }
        return diaryResponses;
    }

    //id 조회
    public Optional<DiaryResponse> findDiaryById(Long id) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);
        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();
            DiaryResponse responseDto = convertToResponseDto(diary);
            return Optional.of(responseDto);
        } else {
            // 5. 엔티티가 존재하지 않으면, 비어있는 Optional을 반환합니다.
            return Optional.empty();
        }
    }

    //수정
    public DiaryResponse editDairy(Long id, DiaryRequest request, Long currentUserId) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        if (diary.getUser().getId() != currentUserId) {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }
        diary.setTitle(request.getTitle());
        diary.setContent(request.getContent());

        Diary updatedDiary = diaryRepository.save(diary);

        return convertToResponseDto(updatedDiary);  //수정 서비스랑 콘트롤러수저하기
    }

    //dto -> diary 엔티티 변형
    private DiaryResponse convertToResponseDto(Diary diary) {
        if (diary == null) {
            return null;
        }
        return DiaryResponse.builder()
                .title(diary.getTitle())
                .content(diary.getContent())
                .createAt(diary.getCreateAt())
                .nickname(diary.getUser() != null ? diary.getUser().getNickname() : null)
                .build();
    }

}
