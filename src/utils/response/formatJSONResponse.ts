const formatJSONResponse = (response: Record<string, unknown>, statusCode = 200) => {
  return {
    statusCode,
    data: response
  }
};

export default formatJSONResponse;