import { searchCourses, showAllCourses, routeToCourse } from "./core/core.js";

const initApp = () => {
  searchCourses();

  showAllCourses();

  routeToCourse();
};

initApp();
