# project-todo-list

## 구현한 기능
### 메인
- 할 일 등록, 삭제
- 할 일 완료 처리
### 서브
- 글자 수 제한 처리
- 할 일 전체 선택 / 해제

## 구현 예정 기능
### 메인
- 할 일 수정
- 회원 기능
    - 회원가입
    - 로그인 / 로그아웃
### 서브
- 검색 기능
- 할 일 목록 페이징 처리
- 마감일 기능

## 학습 내용
### PUT 과 PATCH
HTTP 메서드 중 업데이트와 관련된 메서드는 `PUT`과 `PATCH`가 있다.

이 둘의 차이점은 특정 리소스의 전체냐 혹은 부분이냐의 차이인거 같다.

- PUT 메서드
    - 클라이언트가 보낸 데이터로 리소스 전체를 완전히 업데이트 한다.

- PATCH 메서드
    - 클라이언트가 보낸 데이터로 리소스의 일부만 업데이트 한다.

> 만약 **이름, 나이, 성별**의 정보를 가진 회원이 있다. 
>> - `PUT`메서드로 이름 데이터만 요청을 보내면 보내지 않은 값은 `NULL`값이 되어 버린다.
>> - `PATCH` 메서드로 요청을 할 경우에는 이름 데이터만 요청받은 데이터로 변경하고 `나머지 값은 원래의 값을 유지`한다.