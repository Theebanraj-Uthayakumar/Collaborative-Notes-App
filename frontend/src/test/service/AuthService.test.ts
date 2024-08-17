import ApiConstants from "../../shared/constants/apiConstants";
import CommonService from "../../service/common.service";
import { login, register, logout, isAuthenticated, getUser } from "../../service/user.service";
import { setCookies, removeCookies, getAccessToken } from "../../shared/utils/helpers";

jest.mock("../../service/common.service", () => ({
  invokeHttpCallFetch: jest.fn()
}));

jest.mock("../../shared/utils/helpers", () => ({
  setCookies: jest.fn(),
  removeCookies: jest.fn(),
  getAccessToken: jest.fn()
}));

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login and set cookies", async () => {
    const mockResponse = {
      data: {
        userDetails: { id: "1", name: "Test User" },
        accessToken: "access_token",
        refreshToken: "refresh_token",
        user: { id: "1", name: "Test User" }
      }
    };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    await login("test@example.com", "password");

    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith(
      "POST",
      ApiConstants.LOGIN_API,
      { email: "test@example.com", password: "password" }
    );
    expect(setCookies).toHaveBeenCalledWith(
      mockResponse.data.userDetails,
      mockResponse.data.accessToken,
      mockResponse.data.refreshToken
    );
  });

  it("should register and set cookies", async () => {
    const mockResponse = {
      data: {
        data: {
          userDetails: { id: "1", name: "Test User" },
          accessToken: "access_token",
          refreshToken: "refresh_token",
          user: { id: "1", name: "Test User" }
        }
      }
    };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    await register("username", "test@example.com", "password");

    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith(
      "POST",
      ApiConstants.REGISTER_API,
      { username: "username", email: "test@example.com", password: "password" }
    );
    expect(setCookies).toHaveBeenCalledWith(
      mockResponse.data.data.userDetails,
      mockResponse.data.data.accessToken,
      mockResponse.data.data.refreshToken
    );
  });

  it("should logout and remove cookies", () => {
    logout();
    expect(removeCookies).toHaveBeenCalled();
  });

  it("should return true if user is authenticated", () => {
    (getAccessToken as jest.Mock).mockReturnValue("some_token");

    expect(isAuthenticated()).toBe(true);
    expect(getAccessToken).toHaveBeenCalled();
  });

  it("should return false if user is not authenticated", () => {
    (getAccessToken as jest.Mock).mockReturnValue(null);

    expect(isAuthenticated()).toBe(false);
    expect(getAccessToken).toHaveBeenCalled();
  });

  it("should get user details", async () => {
    const mockResponse = { data: { id: "1", name: "Test User" } };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getUser();
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith(
      "GET",
      ApiConstants.GET_USER_API
    );
  });
});