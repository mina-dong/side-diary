# 방명록 서비스 Side-Guestbook

## 프로젝트 소개 (About The Project)

**Side-Guestbook**은 사용자가 자유롭게 방문록을 작성하고 관리할 수 있는 웹 애플리케이션입니다.  
회원가입과 로그인을 한 사용자는 롤링페이퍼처럼 메시지를 남기고, 수정 및 삭제할 수 있습니다.  
메시지는 실제 포스트잇처럼 화면에 붙이는 느낌으로 표시됩니다.


이 프로젝트는 Spring Boot를 이용해 CRUD 기능과 사용자 Role을 구현하고, MySQL과 연동하여 데이터베이스 연결을 경험했습니다. 또한 JWT 기술을 적용하여 로그인 상태를 안전하게 유지합니다.
개인적으로 AWS EC2, S3, RDS 환경 구축부터 배포까지 시도하며 공부하기 위해 만든 프로젝트입니다.


**Side-Guestbook** is a simple web application where users can write and manage guestbook entries.  
Logged-in users can leave messages, edit, and delete them.  
Messages appear on the screen in a sticky-note inspired style.
JWT (Json Web Token) is used to securely manage login sessions.

This project was implemented using Spring Boot to provide CRUD functionality and user role management, and it is connected to a MySQL database.  
JWT (Json Web Token) is also applied to securely manage user login sessions.  
It was personally developed as a learning project, including the setup and deployment of AWS EC2, S3, and RDS environments.


## 🎥 시연 (Demo)

메인 화면과 시연 예시 입니다.

<p float="left">
  <img src="https://github.com/user-attachments/assets/db855421-e4cb-41a6-be0c-66cf03c5bb65" width="25%"/>
  <img src="https://github.com/user-attachments/assets/518af8e2-3e65-4e14-9b70-4e6fe1240af2" width="300" />
</p>

<p>
  <sub>Main Page of Side Guestbook(smartphone) &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Desktop</sub>
</p>


![방문록 작성 시연](https://github.com/user-attachments/assets/7d578a5a-56dc-4652-a11f-0cf00c6fe948)
*Example of writing a guestbook entry*


## 🛠️ 기술 스택 (Tech Stack)

- Frontend: React, Vite, Tailwind CSS, JavaScript  
- Backend: Spring Boot, Java, Gradle  
- Database: MySQL  
- Deployment: AWS EC2 (Backend), S3 (Frontend)    
- Security: JWT (Json Web Token)  

## 📌 주요 기능 (Features)

- **회원가입 (Sign Up)**: 새로운 사용자가 회원 계정을 생성할 수 있습니다.  
- **로그인 (Login)**: 등록된 계정으로 로그인할 수 있습니다.  
- **방문록 목록 조회 (View Guestbook List)**: 누구나 작성된 방문록 메시지를 확인할 수 있습니다.  
- **방문록 작성 (Create Guestbook Entry)**: 로그인된 사용자가 제목, 내용, 포스트잇의 색상을 정해 새로운 메시지를 작성할 수 있습니다.
- **방문록 수정 (Edit Guestbook Entry)**: 작성한 메시지를 수정할 수 있습니다.  
- **방문록 삭제 (Delete Guestbook Entry)**: 작성한 메시지를 삭제할 수 있습니다.  


## ⚙️ 환경 설정 (Configuration)

### 1. 백엔드 환경변수 설정 (Backend Environment Variables)

프로젝트를 실행하려면 다음 환경변수가 필요합니다.  
**IntelliJ Run/Debug Configuration** 또는 OS 환경 변수를 통해 설정합니다.

* `DB_URL` : 데이터베이스 연결 URL (예: `jdbc:mysql://localhost:3306/side_guestbook?serverTimezone=Asia/Seoul`)  
* `DB_USERNAME` : 데이터베이스 사용자 이름  
* `DB_PASSWORD` : 데이터베이스 비밀번호  
* `JWT_SECRET` : JWT 토큰 생성을 위한 비밀 키  
* `JWT_EXPIRATION` : JWT 만료 시간 (밀리초 단위)  
* `APP_INVITATION_CODES` : 초대 코드 (사용자 등록용)

---

### 2. 프론트엔드 환경변수 설정 (Frontend Environment Variables)

프론트엔드 프로젝트 루트에 `.env` 파일을 만들고 아래 내용을 추가합니다.

* `VITE_APP_API_URL` : 백엔드 API 서버 URL (예: `http://localhost:8080`)


## 🚀 설치 및 실행 (Getting Started)

### 사전 요구 사항 (Prerequisites)
- Node.js (v18 이상)  
- Java (JDK 17 이상)  
- MySQL  

---

### 1️⃣ 프론트엔드 실행 (Frontend Setup)
```bash
# 리포지토리 클론
git clone https://github.com/mina-dong/side-guestbook.git
cd side-guestbook/frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2️⃣ 백엔드 실행 (Backend Setup)
```bash
cd ../backend

# Gradle로 Spring Boot 애플리케이션 실행
./gradlew.bat bootRun
```




