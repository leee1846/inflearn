import { fetchCourseList } from "./api.js";

// 메인페이지 course 목록 element에 적용
export const makeCourseItems = (courses) => {
  const lastElement = document.querySelector("#course-last-item");

  courses.forEach((course) => {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("p");
    const nameElement = document.createElement("p");
    const priceElement = document.createElement("p");

    aElement.href = `/${course.id}`;
    imgElement.src = course.coverImageUrl;
    titleElement.innerHTML = course.title;
    titleElement.classList.add("course-title");
    nameElement.innerHTML = course.instructorName;
    nameElement.classList.add("course-name");
    priceElement.innerHTML = course.price;
    priceElement.classList.add("course-price");

    liElement.appendChild(aElement);
    aElement.appendChild(imgElement);
    imgElement.after(titleElement);
    titleElement.after(nameElement);
    nameElement.after(priceElement);
    lastElement.before(liElement);
  });
};

class Observer {
  constructor() {
    this.pageNum = 0;
    this.courseListLength = 20;
  }
  observe() {
    const lastElement = document.querySelector("#course-last-item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          this.pageNum++;

          if (this.courseListLength >= 20) {
            const allCourses = await fetchCourseList(this.pageNum);
            const { ok, data } = allCourses;
            const { courses } = data;
            this.courseListLength = courses.length;
            if (ok) {
              makeCourseItems(courses);
            }
          }
        }
      });
    });

    if (lastElement) observer.observe(lastElement);
  }
}
export const CourseObserve = new Observer();
// export const observeCourse = () => {
//   const lastElement = document.querySelector("#course-last-item");

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(async (entry) => {
//       if (entry.isIntersecting) {
//         pageNum++;

//         if (courseListLength >= 20) {
//           const allCourses = await fetchCourseList(pageNum);
//           const { ok, data } = allCourses;
//           const { courses } = data;
//           courseListLength = courses.length;
//           if (ok) {
//             makeCourseItems(courses);
//           }
//         }
//       }
//     });
//   });

//   if (lastElement) observer.observe(lastElement);
// };
