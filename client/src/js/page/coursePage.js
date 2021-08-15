import { fetchCourseItem } from "../util/api.js";

// 선택한 코스의 id 가져오기
const getId = () => {
  const pathName = window.location.pathname.replace("/", "");
  return Number(pathName);
};

// 코스 데이터에 맞는 엘리먼트 생성
const makeCourseElements = (course) => {
  const imgElement = document.querySelector("#course-item-img");
  const titleElement = document.querySelector("#course-item-title");
  const nameElement = document.querySelector("#course-item-name");
  const priceElement = document.querySelector("#course-item-price");

  imgElement.src = course.coverImageUrl;
  titleElement.innerHTML = course.title;
  nameElement.innerHTML = course.instructorName;
  priceElement.innerHTML = course.price;
};

const showCourse = async () => {
  const courseId = getId();
  const response = await fetchCourseItem(courseId);
  const { ok, data } = response;
  const { course } = data;

  if (ok) {
    makeCourseElements(course);
  }
};

const initRoute = () => {
  showCourse();
};

initRoute();
