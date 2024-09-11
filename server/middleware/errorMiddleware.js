// ERROR MIDDLEWARE | NEXT FUNCTION
const errorMiddleware = (err, req, res) => {
    const defaultError = {
        statusCode: 404,
        success: "failed",
        message: err
    }
    if (err?.name === "ValicationError") {
        defaultError.statusCode = 404
        defaultError.message = Object.values(err, errors)
            .map((el) => el.message)
            .join(",")
    }
    //duliction error
    if (err.code && err.code === 11000) {
        defaultError.statusCode = 404
        defaultError.message = `${Object.values(
            err.keyValue
        )} filed has to be unique`
    }
    res.status(defaultError.statusCode).json({
        success: defaultError.success,
        message: defaultError.message
    })
}
export default errorMiddleware