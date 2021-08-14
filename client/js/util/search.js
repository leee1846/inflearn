import { fetchCourseTitle } from "./api.js";

const courseBox = document.querySelector("#search-list");

const changeLabelStyle = (bgColor, borderColor, shadow) => {
  const label = document.querySelector("#search-label");
  label.style.backgroundColor = bgColor;
  label.style.borderColor = borderColor;
  label.style.boxShadow = shadow;
};

export const eventPreventDefault = (formElement) => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

const makeCourseList = (arrayList) => {
  courseBox.innerHTML = arrayList;
};

const showCourseList = async (inputValue) => {
  const searchResults = await fetchCourseTitle(inputValue);
  const { ok, data } = searchResults;
  const { results } = data;
  let arrayList = [];

  if (ok) {
    arrayList = results
      .map((item) => {
        return (item = `<li><a href="#">${item.title}</a></li>`);
      })
      .join("");
  }

  makeCourseList(arrayList);
};

export const deleteResultOnBlur = (searchInput) => {
  const emptyItem = "";
  searchInput.addEventListener("blur", () => {
    changeLabelStyle(
      "rgba(29, 192, 120, 0.12)",
      "rgba(29, 192, 120, 0.24)",
      "0 2px 4px 0 rgba(42, 42, 42, 0.12)"
    );
    courseBox.innerHTML = emptyItem;
  });
};

export const getResultOnFocus = (searchInput) => {
  searchInput.addEventListener("focus", (e) => {
    changeLabelStyle(
      "white",
      "lightgray",
      "0 4px 10px 0 rgba(14, 14, 14, 0.2)"
    );
    const inputValue = e.target.value;
    if (inputValue.length > 1) showCourseList(e.target.value);
  });
};

export const searchCoursesOnChange = (searchInput) => {
  searchInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 1) {
      showCourseList(inputValue);
    } else {
      makeCourseList("");
    }
  });
};
