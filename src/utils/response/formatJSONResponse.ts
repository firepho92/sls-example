const formatJSONResponse = (data: object, statusCode = 200) => {
  return {
    statusCode,
    data
  }
};

export default formatJSONResponse;