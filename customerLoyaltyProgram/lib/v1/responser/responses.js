const successResponse = function(messages = '', data = [], extras = {}) {
    var httpResponse = {
        success: true,
        data ,
        messages,
}
    httpResponse = {...httpResponse, ...extras}
    return httpResponse
}

const errorResponse = function(messages = '', data = []) {
    var httpResponse = {
        success: false,
        data,
        messages, 
    }
    return httpResponse
}

exports.unauthorized = (res) => {
  return res.status(403).json(errorResponse("You are not authoriz"));
};

exports.unauthenticated = (res) => {
  return res
    .status(401)
    .json(errorResponse("unauthenticated, please login first"));
};


exports.failedWithMessage = (msg, res) => {
  return res.status(400).json(errorResponse(msg));
};

exports.serverError = (res) => {
  return res
    .status(500)
    .json(errorResponse("something went wrong, please try again later."));
};

exports.forbidden = (res) => {
  return res.status(403).json(errorResponse("forbidden"));
};

exports.notAcceptable = (res) => {
  return res.status(406).json(errorResponse("Please provide acceptable data"));
};

exports.successWithMessage = (msg, res, data=[]) => {
  return res.status(200).json(successResponse(msg, data));
};
exports.createdWithMessage = (msg, res, data={}) => {
  return res.status(201).json(successResponse(msg, data));
};