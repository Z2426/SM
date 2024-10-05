
import { 
    HTTP_BAD_REQUEST, 
    HTTP_BAD_REQUEST_MESSAGE, 
    HTTP_UNAUTHORIZED, 
    HTTP_UNAUTHORIZED_MESSAGE, 
    HTTP_FORBIDDEN, 
    HTTP_FORBIDDEN_MESSAGE, 
    HTTP_NOT_FOUND, 
    HTTP_NOT_FOUND_MESSAGE, 
    HTTP_INTERNAL_SERVER_ERROR, 
    HTTP_INTERNAL_SERVER_ERROR_MESSAGE, 
    HTTP_SERVICE_UNAVAILABLE, 
    HTTP_SERVICE_UNAVAILABLE_MESSAGE 
} from '../utils/httpStatusCodes.js'; // Đường dẫn tương đối

const errorMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: HTTP_INTERNAL_SERVER_ERROR,
        success: "failed",
        message: HTTP_INTERNAL_SERVER_ERROR_MESSAGE,
    };
    console.error(`Error: ${err.message}`);
    console.error(err);
    
    if (err.name === "ValidationError") {
        defaultError.statusCode = HTTP_BAD_REQUEST; 
        defaultError.message = Object.values(err.errors)
            .map((el) => el.message)
            .join(", ");
    }
    if (err.status === HTTP_UNAUTHORIZED) {
        defaultError.statusCode = HTTP_UNAUTHORIZED; 
        defaultError.message = HTTP_UNAUTHORIZED_MESSAGE;
    }
    if (err.status === HTTP_FORBIDDEN) {
        defaultError.statusCode = HTTP_FORBIDDEN; 
        defaultError.message = HTTP_FORBIDDEN_MESSAGE;
    }
    if (err.status === HTTP_NOT_FOUND) {
        defaultError.statusCode = HTTP_NOT_FOUND;
        defaultError.message = HTTP_NOT_FOUND_MESSAGE;
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = HTTP_BAD_REQUEST; 
        defaultError.message = `${Object.values(err.keyValue).join(", ")} field has to be unique.`;
    }
    if (err.type === 'NOT_IMPLEMENTED') {
        defaultError.statusCode = 501;
        defaultError.message = "Not implemented. The server does not support the functionality required to fulfill the request.";
    }
    
    if (err.type === 'BAD_GATEWAY') {
        defaultError.statusCode = 502; 
        defaultError.message = "Bad gateway. The server was acting as a gateway or proxy and received an invalid response from the upstream server.";
    }

    if (err.type === 'SERVICE_UNAVAILABLE') {
        defaultError.statusCode = HTTP_SERVICE_UNAVAILABLE; 
        defaultError.message = HTTP_SERVICE_UNAVAILABLE_MESSAGE;
    }

    if (err.type === 'GATEWAY_TIMEOUT') {
        defaultError.statusCode = 504;
        defaultError.message = "Gateway timeout. The server, while acting as a gateway, did not receive a timely response from the upstream server.";
    }
    
    res.status(defaultError.statusCode).json({
        success: defaultError.success,
        message: defaultError.message,
        ...(process.env.NODE_ENV === 'development' && { error: err }),
    });
};

export default errorMiddleware;
