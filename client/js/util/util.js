import { fetchCourseTitle, fetchCourses } from "./api.js";

const courseBox = document.querySelector("#course-list");

export const eventPreventDefault = (formElement) => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

const showCourseList = async (inputValue) => {
  const searchResults = await fetchCourseTitle(inputValue);
  const { ok, data } = searchResults;
  const { results } = data;
  let arrayList = [];

  if (ok) {
    arrayList = results
      .map((item) => {
        return (item = `<li>${item.title}</li>`);
      })
      .join("");
  }

  courseBox.innerHTML = arrayList;
};

export const deleteResultOnBlur = (searchInput) => {
  const emptyItem = "";
  searchInput.addEventListener("blur", () => {
    courseBox.innerHTML = emptyItem;
  });
};

export const getResultOnFocus = (searchInput) => {
  searchInput.addEventListener("focus", (e) => {
    showCourseList(e.target.value);
  });
};

export const searchCoursesOnChange = (searchInput) => {
  searchInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 1) {
      showCourseList(inputValue);
    }
  });
};
