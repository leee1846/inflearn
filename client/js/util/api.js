export const fetchCourseTitle = async (searchValue) => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/api/search/courses",
    params: {
      keyword: searchValue,
      max: 10,
    },
  });
  return response.data;
};

export const fetchCourses = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/api/courses",
  });

  return response.data.data;
};
