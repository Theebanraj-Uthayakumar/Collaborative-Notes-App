import Constants from "../../../shared/constants/constants";

describe("Constants", () => {
  it("should have correct API response codes", () => {
    expect(Constants.API_RESPONSE_CODES.SUCCESS).toBe(200);
    expect(Constants.API_RESPONSE_CODES.CREATED).toBe(201);
    expect(Constants.API_RESPONSE_CODES.NO_CONTENT).toBe(204);
    expect(Constants.API_RESPONSE_CODES.BAD_REQUEST).toBe(400);
    expect(Constants.API_RESPONSE_CODES.NOT_FOUND).toBe(404);
    expect(Constants.API_RESPONSE_CODES.UNAUTHORIZED).toBe(401);
    expect(Constants.API_RESPONSE_CODES.INTERNAL_SERVER_ERROR).toBe(500);
    expect(Constants.API_RESPONSE_CODES.TOO_MANY_REQUESTS).toBe(429);
  });

  it("should have correct token names", () => {
    expect(Constants.TOKEN_NAMES.ACCESS_TOKEN).toBe("access_token");
    expect(Constants.TOKEN_NAMES.REFRESH_TOKEN).toBe("refresh_token");
    expect(Constants.TOKEN_NAMES.USER_DETAILS).toBe("userDetails");
  });
});