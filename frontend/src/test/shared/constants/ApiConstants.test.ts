import ApiConstants from "../../../shared/constants/apiConstants";
import EnvironmentService from "../../../service/environment.service";

jest.mock("../../../service/environment.service");

const initializeApiConstants = () => {
  return {
    AUTH_SERVICE_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/`,
    LOGIN_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/login`,
    REGISTER_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/register`,
    LOGOUT_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/logout`,
    REFRESH_TOKEN_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/refresh-token`,
    GET_USER_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/auth/get-all-users`,
    NOTES_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/`,
    CREATE_NOTE_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/create-note`,
    DELETE_NOTE_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/delete-note`,
    UPDATE_NOTE_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/update-note`,
    GET_NOTES_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/get-notes`,
    SHARE_NOTE_API: `${EnvironmentService.BACKEND_API_BASE_URL()}/api/v1/notes/share`,
  };
};

describe("ApiConstants", () => {
  const mockBaseUrl = "http://mockurl.com";

  beforeAll(() => {
    (EnvironmentService.BACKEND_API_BASE_URL as jest.Mock).mockReturnValue(
      mockBaseUrl
    );
  });

  it("should have correct API endpoints", () => {
    const constants = initializeApiConstants();

    expect(ApiConstants.AUTH_SERVICE_API).toBe(constants.AUTH_SERVICE_API);
    expect(ApiConstants.LOGIN_API).toBe(constants.LOGIN_API);
    expect(ApiConstants.REGISTER_API).toBe(constants.REGISTER_API);
    expect(ApiConstants.LOGOUT_API).toBe(constants.LOGOUT_API);
    expect(ApiConstants.REFRESH_TOKEN_API).toBe(constants.REFRESH_TOKEN_API);
    expect(ApiConstants.GET_USER_API).toBe(constants.GET_USER_API);

    expect(ApiConstants.NOTES_API).toBe(constants.NOTES_API);
    expect(ApiConstants.CREATE_NOTE_API).toBe(constants.CREATE_NOTE_API);
    expect(ApiConstants.DELETE_NOTE_API).toBe(constants.DELETE_NOTE_API);
    expect(ApiConstants.UPDATE_NOTE_API).toBe(constants.UPDATE_NOTE_API);
    expect(ApiConstants.GET_NOTES_API).toBe(constants.GET_NOTES_API);
    expect(ApiConstants.SHARE_NOTE_API).toBe(constants.SHARE_NOTE_API);
  });
});
