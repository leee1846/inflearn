import {
  searchCoursesOnChange,
  getResultOnFocus,
  deleteResultOnBlur,
  eventPreventDefault,
} from "../util/util.js";

const activeSearchInput = (searchInput) => {
  searchCoursesOnChange(searchInput);
  getResultOnFocus(searchInput);
  deleteResultOnBlur(searchInput);
};

export const getSearchResult = () => {
  const searchInput = document.getElementById("input-search");
  const searchFormElement = document.querySelector("#search-form");

  eventPreventDefault(searchFormElement);
  activeSearchInput(searchInput);
};
