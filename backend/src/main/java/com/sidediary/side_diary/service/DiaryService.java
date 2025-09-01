package com.sidediary.side_diary.service;

import com.sidediary.side_diary.dto.DiaryRequest;
import com.sidediary.side_diary.dto.DiaryResponse;
import com.sidediary.side_diary.entity.Diary;
import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.repository.DiaryRepository;
import com.sidediary.side_diary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    //작성서비스
    public Diary createDiary(DiaryRequest request){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        Diary diary = Diary.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .background(Diary.Color.valueOf(request.getBackground().toUpperCase())) // [수정] String을 Enum으로 변환
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
    @Transactional // 을 추가하면, 메서드가 성공적으로 완료될 때 JPA가 자동으로 UPDATE 쿼리를 실행하고 DB에 변경사항을 저장합니다.
    public DiaryResponse editDairy(Long id, DiaryRequest request, Long currentUserId) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        if (diary.getUser().getId() != currentUserId) {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }
        diary.setTitle(request.getTitle());
        diary.setContent(request.getContent());
        diary.setBackground(Diary.Color.valueOf(request.getBackground().toUpperCase())); //[수정] String을 Enum으로 변환

        Diary updatedDiary = diaryRepository.save(diary);

        return convertToResponseDto(updatedDiary);  //수정 서비스랑 콘트롤러수저하기
    }

    //삭제
    @Transactional
    public void deleteDairy(Long id,
                                     Long currentUserId,
                                     Collection<? extends GrantedAuthority> authorities) {

        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("아이디를 찾을 수 없습니다."));

        //관리자권한확인
        boolean isAdmin = authorities.stream().anyMatch(a->a.getAuthority().equals("ROLE_ADMIN"));

        //관리자아니면서 본인 글 아닐때만 예외처리
        if (!isAdmin && !Objects.equals(diary.getUser().getId(), currentUserId)) {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }

        //삭제진행
        diaryRepository.delete(diary);
    }

    //dto -> diary 엔티티 변형
    private DiaryResponse convertToResponseDto(Diary diary) {
        if (diary == null) {
            return null;
        }
        return DiaryResponse.builder()
                .id(diary.getId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .userId(diary.getUser() != null ? diary.getUser().getId() : null)
                .userNickname(diary.getUser() != null ? diary.getUser().getNickname() : null)
                .createAt(diary.getCreateAt())
                .background(diary.getBackground() != null ? diary.getBackground().name() : null) // enum -> String
                .build();
    }

}
