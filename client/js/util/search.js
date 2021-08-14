import { fetchCourseTitle } from "./api.js";

const searchListSection = document.querySelector("#search-list-section");

const removeSearchSection = () => {
  searchListSection.style.display = "none";
};

export const searchListObserver = () => {
  const lastElement = document.querySelector("#search-lastitem");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) console.log(entry);
    });
  });
  if (lastElement) observer.observe(lastElement);
};

const changeLabelStyle = (bgColor, borderColor, shadow) => {
  const label = document.querySelector("#search-label");
  label.style.backgroundColor = bgColor;
  label.style.borderColor = borderColor;
  label.style.boxShadow = shadow;
};

export const eventPreventDefault = (formElement) => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

const showCourseList = async (inputValue) => {
  const lastLiElement = document.querySelector("#search-lastitem");
  const searchResults = await fetchCourseTitle(inputValue);
  const { ok, data } = searchResults;
  const { results } = data;

  if (ok) {
    searchListSection.style.display = "initial";
    results.forEach((item, index) => {
      const liElement = document.createElement("li");
      const aElement = document.createElement("a");

      liElement.classList.add("search-item");
      aElement.innerHTML = item.title;
      aElement.href = `/${item.id}`;

      liElement.appendChild(aElement);
      lastLiElement.before(liElement);
    });
  }
};

export const deleteResultOnBlur = (searchInput) => {
  const emptyItem = "";
  searchInput.addEventListener("blur", () => {
    changeLabelStyle(
      "rgba(29, 192, 120, 0.12)",
      "rgba(29, 192, 120, 0.24)",
      "0 2px 4px 0 rgba(42, 42, 42, 0.12)"
    );
    removeSearchSection();
  });
};

export const getResultOnFocus = (searchInput) => {
  searchInput.addEventListener("focus", (e) => {
    const inputValue = e.target.value;

    changeLabelStyle(
      "white",
      "lightgray",
      "0 4px 10px 0 rgba(14, 14, 14, 0.2)"
    );

    if (inputValue.length > 1) showCourseList(e.target.value);
  });
};

export const searchCoursesOnChange = (searchInput) => {
  searchListObserver();
  searchInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 1) {
      showCourseList(inputValue);
    } else {
      removeSearchSection();
    }
  });
};
