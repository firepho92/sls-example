const formatJSONResponse = (data: object | string | number, statusCode = 200) => {
  return {
    statusCode,
    data
  }
};

export default formatJSONResponse;