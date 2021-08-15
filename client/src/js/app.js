import { searchCourses, showAllCourses } from "./page/mainPage.js";
import { CourseObserve } from "./util/courses.js";

const initMainPage = () => {
  searchCourses();

  showAllCourses().then(() => CourseObserve.observe());
};

initMainPage();
