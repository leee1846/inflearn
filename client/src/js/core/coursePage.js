import { fetchCourseItem } from "../util/api.js";

const getId = () => {
  const pathName = window.location.pathname.replace("/", "");
  return Number(pathName);
};

const showCourseData = (course) => {
  const imgElement = document.querySelector("#course-item-img");
  const titleElement = document.querySelector("#course-item-title");
  const nameElement = document.querySelector("#course-item-name");
  const priceElement = document.querySelector("#course-item-price");

  imgElement.src = course.coverImageUrl;
  titleElement.innerHTML = course.title;
  nameElement.innerHTML = course.instructorName;
  priceElement.innerHTML = course.price;
};

const routeToCourse = async () => {
  const courseId = getId();
  const response = await fetchCourseItem(courseId);
  const { ok, data } = response;
  const { course } = data;

  if (ok) {
    showCourseData(course);
  }
};

const initRoute = () => {
  routeToCourse();
};

initRoute();
