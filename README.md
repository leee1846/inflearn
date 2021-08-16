# 인프런 코딩 테스트

## 환경 구성

1. `yarn` 실행
2. `yarn start` 실행 (API 서버 실행)
   - port : 3000

## 서비스 내용

강의를 검색하고 검색 결과를 리스트로 볼 수 있는 페이지를 만듭니다.
아래 강의 리스트와 강의 검색에 관한 기능 요청을 참고해서 서비스를 만듭니다.

## 강의 리스트 페이지의 구현은 다음을 참고합니다.

1. 아래 API 명세를 참고하여 서버에서 응답으로 받은 강의 리스트를 노출합니다.
2. 무한 스크롤을 이용하여 강의 리스트를 노출합니다.
3. 각 강의는 다음 내용을 포함합니다.
   - 강의 이미지
   - 강의 제목
   - 지식공유자 이름
   - 강의 가격
4. 각 강의는 클릭하면 강의 상세 페이지로 이동할 수 있어야 합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.
   - 단, 페이지 이동은 가능해야 합니다.

## 강의 검색의 구현은 다음을 참고합니다.

1. 검색창에 검색어 입력시 입력창 하단에 검색 결과 리스트를 표시합니다. 사용 API는 명세를 참고합니다.
   - 검색 결과는 강의 제목을 나열합니다.
2. 검색어가 2자 이상이면 검색 결과를 노출합니다.
3. 검색창을 포커싱할 때 이미 입력되어있는 검색어가 있다면 검색 결과를 노출합니다.
4. 검색창이 포커싱 아웃(blur)되면 검색결과 리스트를 숨깁니다.
5. 검색 결과에 나타난 강의 제목을 클릭하면 해당 강의 상세 페이지로 이동합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.

## 각 구현은 다음을 참고합니다.

1. HTML 페이지를 제공하는 서버는 `server.js`의 NodeJS 서버를 활용해도 되고 별도의 서버를 만들어 사용해도 됩니다.
2. 페이지는 반응형으로 동작 하고 모바일 버전도 고려되어야 합니다.
3. React, Vue, Angular, Svelte와 같은 프론트엔드 라이브러리 또는 프레임워크를 사용하지 않고 Vanilla Javascript를 통해 개발해야합니다.
   - 기타 다른 패키지의 사용에는 제한이 없습니다.
4. API는 아래 [API 명세](#API-명세)를 참고합니다.
5. git과 test 작성은 자유입니다.
6. 아래 [**구현 설명**](#구현-설명) 영역에는 과제에 대해 설명 또는 전달하고 싶은 내용을 자유롭게 적어주시면 됩니다.
7. 위 참고 내용 외에 다른 내용을 구현하는 것은 자유롭게 진행합니다.
   - 위에 요구된 내용은 필수 항목입니다. 즉, 필수 요구사항을 충족한다면 구현 방식은 자유입니다.

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

## 구현 설명
### 1. html 파일
- html 파일은 2개로 페이지별로 파일을 생성하였습니다. 
- index.html은 처음 보여질 메인페이지이며, html폴더안에 있는 coursePage.html은 course클릭시 넘어갈 course상세페이지입니다.

### 2. css 파일
- scss를 사용하여 스타일을 적용하였습니다.
- css파일은 3개로 reset.css와 페이지별로 나눈 searchPage.css, coursePage.css가 있습니다.
- 2개의 페이지 모두 반응형을 적용하였습니다.

### 3. javascript 파일
- 첫 페이지는 app.js를 통해 javascript가 적용되며, course상세페이지는 page폴더의 coursePage.js가 적용됩니다.
- 폴더는 page와 util로 나누었으며, util폴더안에는 기능별로 파일을 나누었습니다.

### 4. 기능 설명
#### 4-1. 검색
- input 검색시 value가 2자이상일때 server와 통신합니다.
- debounce 0.3초를 적용하였습니다.
- 리스트는 20개씩 가져옵니다.
- focus,blur 이벤트가 적용될때 스타일이 변경됩니다.

#### 4-2. 강의 리스트
- 첫 메인페이지에 나오는 강의 리스트는 IntersectionObserver를 사용하여 무한스크롤을 적용하였습니다.

#### 4-3. course 클릭
- 검색된 리스트와 강의 리스트는 모두 a태그이며, href주소를 course의 id로 적용하였습니다.
- course를 클릭시 coursePage.html이 렌더링되며, 주소의 params를 가져와서 fetch한후 data를 적용하였습니다.

### 5. 사용 라이브러리
1. axios
2. lodash
3. express

### 6. 참고
- "yarn dev"를 통해서 실행합니다.
- http://localhost:8080/

### 7. 느낀점
서류전형을 합격하고 기쁜마음에 과제를 기다렸었습니다.
그러나 과제를 받고 README파일을 읽으면서 머리가 하얘지고 순간 멍했습니다.
프로그래밍 공부를 시작할때 바닐라자바스크립트로 투두리스트 프로젝트를 해보고 리액트만 공부를 해서 방향조차 잡히지 않았었습니다.
파일구조는 어떻게 해야하는지, 페이지이동이 있는데 페이지는 어떻게 나누어야하는지, 컴포넌트단위로 간단하게 정리하며 구현해왔던 리액트에 너무 익숙해져 레이아웃을 생각해내는데 오랜시간을 사용했습니다.

정신을 가다듬고 먼저 폴더구조를 고민한후 js파일은 어떻게 나눌지 생각하였습니다.
그리고 HTML을 보여줄 server를 만든후 첫 페이지의 검색창부터 구현을 시작했습니다.
리액트의 컴포넌트단위에 익숙해져 함수단위로 기능을 나누고 최종 함수에 기능함수들을 호출하는 방식으로 구현하고자 노력하였습니다.
첫 페이지를 만들고보니 라우팅조건이 눈에 들어왔습니다. react-router-dom에 익숙해져서 페이지 라우팅을 어떻게 해야하나 또 다시 머리가 하얘졌습니다.
여기저기서 찾은 정보들을 취합하여 페이지이동 기능을 구현하고 반응형 스타일링도 마무리하였습니다.

기쁨도 잠시, README설명을 잘못 이해하여 검색창에 무한스크롤을 적용하고 강의 리스트에는 적용하지 않았었습니다.
다시 정신을 차리고 설명대로 다시 수정하였습니다.

평소 리액트를 사용할때 재사용성과 클린코드를 항상 고민했었는데 이번 과제를 통해 아직 멀었구나...라는 생각이 많이 들었고, 리액트에만 익숙해져있었던 저 자신에게 자극을 줄수 있었던 경험이었습니다.
바닐라 자바스크립트에 익숙한 사람을 뽑는 과정이라면 불합격할수도 있겠다라는 생각을 하면서 과제를 마무리 하긴했지만, 성취감에 웹개발을 시작하였는데 오랜만에 성취감을 느낀것 같아서 리프레시되는 기분이었습니다.


