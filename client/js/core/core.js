import {
  searchCoursesOnChange,
  getResultOnFocus,
  deleteResultOnBlur,
  eventPreventDefault,
} from "../util/search.js";
import { fetchCourses } from "../util/api.js";
import { makeCourseItem } from "../util/courses.js";

const activeSearchInputEvents = (searchInput) => {
  searchCoursesOnChange(searchInput);
  getResultOnFocus(searchInput);
  deleteResultOnBlur(searchInput);
};

export const searchCourses = () => {
  const searchInputElement = document.querySelector("#search-input");
  const searchFormElement = document.querySelector("#search-form");

  eventPreventDefault(searchFormElement);
  activeSearchInputEvents(searchInputElement);
};

export const showAllCourses = async () => {
  const allCourses = await fetchCourses();
  const { ok, data } = allCourses;
  const { courses } = data;
  if (ok) {
    makeCourseItem(courses);
  }
};

export const routeToCourse = () => {
  const pathName = window.location;
  console.log(pathName);
};
