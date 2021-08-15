export const makeCourseItem = (courses) => {
  const listBox = document.querySelector("#course-list");

  courses.forEach((course) => {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("p");
    const nameElement = document.createElement("p");
    const priceElement = document.createElement("p");

    liElement.dataset.courseid = course.id;
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
    listBox.appendChild(liElement);
  });
};
