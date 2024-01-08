const defaultMessage = "invalid value";

/**
 * v-0001 : invalid firstname value
 * v-0002 : invalid lastname value
 * v-0003 : invalid email value
 * v-0004 : invalid password value
 * v-0005 : confirm password does not match password
 * v-0006 : invalid chat room name value
 * v-0007 : invalid chat room limit value
 * v-0009 : invalid communication request value
 * v-0010 : invalid commercial notification content value
 *
 * a-0001 : account not found
 * a-0002 : passed password does not match stored user password
 * a-0003 : account already exists
 * a-0004 : no valid authentication credentials
 * a-0005 : token expired
 *
 * r-0001 : resource not found
 *
 * socket-io
 * sv-0001 : invalid payload on message event (payload not an object)
 * sv-0002 : invalid payload on message event (missing roomId key)
 * sv-0003 : invalid payload on message event (missing message key)
 * s-0001 : error while broadcasting message
 *
 * 0000 : unknown error
 */
const errorCodes = {
    // validation
    "v-0001": { code: "v-0001", message: defaultMessage, status: 400 },
    "v-0002": { code: "v-0002", message: defaultMessage, status: 400 },
    "v-0003": { code: "v-0003", message: defaultMessage, status: 400 },
    "v-0004": { code: "v-0004", message: defaultMessage, status: 400 },
    "v-0005": { code: "v-0005", message: defaultMessage, status: 400 },
    "v-0006": { code: "v-0006", message: defaultMessage, status: 400 },
    "v-0007": { code: "v-0007", message: defaultMessage, status: 400 },
    "v-0009": { code: "v-0009", message: defaultMessage, status: 400 },
    "v-0010": { code: "v-0010", message: defaultMessage, status: 400 },

    // authentication
    "a-0001": { code: "a-0001", message: "account not found", status: 404 },
    "a-0002": { code: "a-0002", message: "invalid password", status: 400 },
    "a-0003": {
        code: "a-0003",
        message: "account with this email already exists",
        status: 400,
    },
    "a-0004": {
        code: "a-0004",
        message: "no valid authentication credentials",
        status: 401,
    },
    "a-0005": {
        code: "a-0005",
        message: "no valid authentication credentials",
        status: 401,
    },

    // authorization
    "aa-0001": { code: "aa-0001", message: "unauthorized", status: 403 },

    // resource
    "r-0001": { code: "r-0001", message: "resource not found", status: 404 },

    // socket-io
    "sv-0001": {
        code: "sv-0001",
        message: "payload error",
    },
    "sv-0002": {
        code: "sv-0002",
        message: "payload error",
    },
    "sv-0003": {
        code: "sv-0003",
        message: "payload error",
    },
    "s-0001": {
        code: "s-0001",
        message: "broadcast failed",
    },

    // unknown error
    "0000": { code: "0000", message: "something went wrong", status: 500 },
};

class ApiError extends Error {
    /**
     * @param {{code: string, message: string, status: number}} errorDetails
     */
    constructor(errorDetails) {
        super();
        this.msg = errorDetails;
    }
}

class ApiValidationError extends Error {
    /**
     * @param {Array<{code: string, message: string}>} errors
     * @param {number} status
     */
    constructor(errors, status) {
        super();
        this.validationErrors = errors;
        this.status = status;
    }
}

class SocketPayloadValidationError extends Error {
    /**
     * @param {{code: string, message: string}} error
     */
    constructor(error) {
        super();
        this.validationError = error;
    }
}

module.exports = {
    ApiError: ApiError,
    ApiValidationError: ApiValidationError,
    SocketPayloadValidationError: SocketPayloadValidationError,
    errorCodes: errorCodes,
};