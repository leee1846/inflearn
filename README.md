## 구현 설명
### 1. html 파일
    - html 파일은 2개로 페이지별로 파일을 생성
    - index.html은 처음 보여질 메인페이지이며, html폴더안에 있는 coursePage.html은 course클릭시 넘어갈 course상세페이지

### 2. css 파일
    - scss를 사용하여 스타일을 적용
    - css파일은 3개로 reset.css와 페이지별로 나눈 searchPage.css, coursePage.css가 있다
    - 2개의 페이지 모두 반응형을 적용

### 3. javascript 파일
    - 첫 페이지는 app.js를 통해 javascript가 적용되며, course상세페이지는 page폴더의 coursePage.js가 적용
    - 폴더는 page와 util로 나누었으며, util폴더안에는 기능별로 파일을 나누기

### 4. 기능 설명
  #### 4-1. 검색
    - input 검색시 value가 2자이상일때 server와 통신
    - debounce 0.3초를 적용
    - 리스트는 20개씩 가져오기
    - focus,blur 이벤트가 적용될때 스타일이 변경

#### 4-2. 강의 리스트
    - 첫 메인페이지에 나오는 강의 리스트는 IntersectionObserver를 사용하여 무한스크롤을 적용

#### 4-3. course 클릭
    - 검색된 리스트와 강의 리스트는 모두 a태그이며, href주소를 course의 id로 적용
    - course를 클릭시 coursePage.html이 렌더링되며, 주소의 params를 가져와서 fetch한후 data를 적용

### 5. 사용 라이브러리
    - axios
    - lodash
    - express

### 6. 참고
    - "yarn start"를 통해서 서버실행
    - "yarn dev"를 통해서 실행
    - http://localhost:8080/
## API 명세

<table>
<tbody>
<tr>
<th>Method</th>
<th>URL</th>
<th>Query String</th>
<th>Body</th>
<th>Response</th>
<th>비고</th>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses`

</td>
<td>

`page`: (_기본값: 1, 값: 1 이상의 number_) 페이지<br/>
`count`: (_기본값: 20, 값: 1 이상의 number_) 페이지당 컨텐츠 수<br/>
`lastContentId`: (_값: 1 이상의 number_) 요청하는 페이지의 이전 페이지 마지막 컨텐츠 id<br/>
`search`: (_값: string_) 검색어

</td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "courses": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
            "price": (number) 강의 가격,
            "coverImageUrl": (string) 강의 커버 이미지
         },
         ...
      ]
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의리스트</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses/:courseId`

</td>
<td></td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "course": {
         "id": (number) 강의 ID,
         "title": (string) 강의 제목,
         "instructorName": (string) 지식공유자 이름,
         "price": (number) 강의 가격,
         "coverImageUrl": (string) 강의 커버 이미지
      }
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의상세</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/search/courses`

</td>
<td>

`keyword`: (_값: string_) 검색어<br/>
`max`: (_기본값: 10, 값: 1 이상의 number_) 검색결과 최대 갯수<br/>

</td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "results": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
         },
         ...
      ]
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>검색</td>
</tr>
</tbody>
</table>
    
