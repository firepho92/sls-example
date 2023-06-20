import Exception from "src/utils/error/Exception";
import ErrorCode from "src/utils/error/errorCode";
import HttpStatusCode from "src/utils/enums/httpStatusCode";

const httpRequestVersionHandlerMiddleware = (versions: Array<string>) => {
  const middlewareBefore = (request: any) => {
    // console.log('httpRequestVersionHandlerMiddleware');
    const regex = /version=([\d.]+)/;
    const matches = request.event.headers['Accept'].match(regex);
    const version = matches ? matches.at(1) : 'Default';
    if (!versions.includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    request.event.version = version;
  };

  return {
    before: middlewareBefore,
  };
};

export default httpRequestVersionHandlerMiddleware;
