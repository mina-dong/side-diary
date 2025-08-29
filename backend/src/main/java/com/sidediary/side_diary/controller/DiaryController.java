package com.sidediary.side_diary.controller;

import com.sidediary.side_diary.dto.DiaryRequest;
import com.sidediary.side_diary.dto.DiaryResponse;

import com.sidediary.side_diary.service.DiaryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<DiaryResponse> editDiary(@PathVariable Long id, @RequestBody DiaryRequest request, HttpSession session){
        Long currentUserId = (Long) session.getAttribute("LoggedInUserId");
        if (currentUserId == null){
            throw new IllegalArgumentException("로그인 필요");
        }

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
