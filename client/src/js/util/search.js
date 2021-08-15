import { fetchCourseTitle } from "./api.js";

const searchListSection = document.querySelector("#search-list-section");
const searchListUl = document.getElementById("search-list");

// 검색 리스트 모두 삭제
const removeSearchItems = () => {
  searchListUl.innerHTML = "";
};

// 검색 리스트 숨기기
const hideSearchSection = () => {
  searchListSection.style.display = "none";
};

// 인풋 스타일 수정
const changeLabelStyle = (bgColor, borderColor, shadow) => {
  const label = document.querySelector("#search-label");
  label.style.backgroundColor = bgColor;
  label.style.borderColor = borderColor;
  label.style.boxShadow = shadow;
};

// form 태그 새로고침막기
export const eventPreventDefault = (formElement) => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

// 조회된 검색리스트 엘리먼트 생성
const showCourseList = async (inputValue) => {
  // 검색값 서버 통신
  const searchResults = await fetchCourseTitle(inputValue);
  const { ok, data } = searchResults;
  const { results: searchRsults } = data;

  // 엘리먼트 생성 전 검색리스트 모두 삭제
  removeSearchItems();

  if (ok) {
    searchListSection.style.display = "initial";
    searchRsults.forEach((item) => {
      const liElement = document.createElement("li");
      const aElement = document.createElement("a");
      liElement.classList.add("search-item");
      aElement.classList.add("search-click");
      aElement.innerHTML = item.title;
      aElement.href = `/${item.id}`;

      liElement.appendChild(aElement);
      searchListUl.appendChild(liElement);
    });
  }
  return searchRsults;
};

// input blur시에 이벤트
export const hideResultOnBlur = (searchInput) => {
  searchInput.addEventListener("blur", (e) => {
    changeLabelStyle(
      "rgba(29, 192, 120, 0.12)",
      "rgba(29, 192, 120, 0.24)",
      "0 2px 4px 0 rgba(42, 42, 42, 0.12)"
    );

    // 검색리스트 숨기기
    if (e?.relatedTarget?.className !== "search-click") {
      hideSearchSection();
    } else if (!e.relatedTarget) {
      hideSearchSection();
    }
  });
};

// input focus시에 검색 리스트 보이기
export const getResultOnFocus = (searchInput) => {
  searchInput.addEventListener("focus", (e) => {
    const inputValue = e.target.value;

    changeLabelStyle(
      "white",
      "lightgray",
      "0 4px 10px 0 rgba(14, 14, 14, 0.2)"
    );

    if (inputValue.length > 1) searchListSection.style.display = "initial";
  });
};

// input 검색시 이벤트
export const searchCoursesOnChange = (searchInput) => {
  let inputValue = "";

  searchInput.addEventListener(
    "input",
    _.debounce((e) => {
      inputValue = e.target.value;

      if (inputValue.length > 1) {
        // 검색리스트 fetch후 보여주기
        showCourseList(inputValue);
      } else {
        removeSearchItems();
        searchListLength = 10;
      }
    }, 300)
  );
};
