import {
  searchCoursesOnChange,
  getResultOnFocus,
  hideResultOnBlur,
  eventPreventDefault,
} from "../util/search.js";
import { fetchCourseList } from "../util/api.js";
import { makeCourseItems } from "../util/courses.js";

const activeSearchInputEvents = (searchInput) => {
  searchCoursesOnChange(searchInput);
  getResultOnFocus(searchInput);
  hideResultOnBlur(searchInput);
};

export const searchCourses = () => {
  const searchInputElement = document.querySelector("#search-input");
  const searchFormElement = document.querySelector("#search-form");

  eventPreventDefault(searchFormElement);
  activeSearchInputEvents(searchInputElement);
};

export const showAllCourses = async () => {
  const allCourses = await fetchCourseList();
  const { ok, data } = allCourses;
  const { courses } = data;
  if (ok) {
    makeCourseItems(courses);
  }
};
