package com.sidediary.side_diary.controller;

import com.sidediary.side_diary.dto.DiaryRequest;
import com.sidediary.side_diary.dto.DiaryResponse;

import com.sidediary.side_diary.entity.User;
import com.sidediary.side_diary.service.DiaryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;

    //일기작성
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')") //EnableMethodSecurity - 시큐리티콘피그에 있음
    public ResponseEntity<String> createDiary(@RequestBody DiaryRequest request){
        diaryService.createDiary(request);
        return ResponseEntity.ok("일기 등록 성공");
    }

    //일기 조회
    @GetMapping
    public ResponseEntity<List<DiaryResponse>> getAllDiaries(){
        List<DiaryResponse> diaries = diaryService.findAllDiaries();
        return ResponseEntity.ok(diaries);
    }
    //일기 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<DiaryResponse> getDiaryById(@PathVariable Long id){
        DiaryResponse diaryResponse  = diaryService.findDiaryById(id)
                                    .orElseThrow(() -> new IllegalArgumentException("일기를 찾을 수 없습니다. ID: " + id));

        return ResponseEntity.ok(diaryResponse);
    }
    //일기 수정
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<DiaryResponse> editDiary(@PathVariable Long id,
                                                   @RequestBody DiaryRequest request,
                                                   @AuthenticationPrincipal User user  // [변경] JWT 필터에서 SecurityContext에 저장한 User 객체
                                                   )
    {
       // @AuthenticationPrincipal이 null을 반환할 경우, 이는 인증이 실패했음을 의미합니다.
       // 하지만 스프링 시큐리티가 이미 처리했기 때문에 이 if문은 필요 없을 수도 있습니다.
       // 그래도 방어적으로 코드를 추가하는 것은 좋습니다.
        if (user == null) {
            throw new IllegalArgumentException("로그인 필요");
        }

        Long currentUserId = user.getId(); // [추가] User 엔티티에서 id 가져오기
        DiaryResponse updatedDiaryResponse = diaryService.editDairy(id, request, currentUserId);

        return ResponseEntity.ok(updatedDiaryResponse);
    }

    //일기 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<DiaryResponse> deleteDiary(@PathVariable Long id, HttpSession session){
        Long currentUserId = (Long) session.getAttribute("LoggedInUserId");
        if (currentUserId == null){
            throw new IllegalArgumentException("로그인 필요");
        }

        DiaryResponse deleteDiaryResponse = diaryService.deleteDairy(id, currentUserId);

        return ResponseEntity.ok(deleteDiaryResponse);
    }



}
