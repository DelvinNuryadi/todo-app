const errorHandler = (error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    return res
        .status(status)
        .json({ success: false, message: message, data: data });
};

export default errorHandler;
