export default class Constants {
    static API_RESPONSE_CODES = {
        SUCCESS: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INTERNAL_SERVER_ERROR: 500,
        TOO_MANY_REQUESTS: 429,
    };

    static TOKEN_NAMES = {
        ACCESS_TOKEN: "access_token",
        REFRESH_TOKEN: "refresh_token",
        USER_DETAILS: "userDetails",
    };
}
