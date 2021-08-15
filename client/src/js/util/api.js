export const fetchCourseItem = async (id) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:3000/api/courses/${id}`,
  });
  return response.data;
};

export const fetchCourseTitle = async (searchValue, page) => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/api/search/courses",
    params: {
      keyword: searchValue,
      max: 10 * page,
    },
  });
  return response.data;
};

export const fetchCourses = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/api/courses",
  });

  return response.data;
};
