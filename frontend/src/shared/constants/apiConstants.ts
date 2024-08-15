import EnvironmentService from "../../service/environment.service";

export default class ApiConstants {
  static API_VERSION = {
    ONE: "/api/v1/",
    TWO: "/api/v2/",
  };

  static SERVICES = {
    AUTH: "auth",
    NOTES: "notes",
  };

  static ENDPOINTS = {
    LOGIN: "login",
    LOGOUT: "logout",
    REFRESH: "refresh-token",
    REGISTER: "register",
    CREATE_NOTE: "create-note",
    GET_NOTES: "get-notes",
    UPDATE_NOTE: "update-note",
    DELETE_NOTE: "delete-note",
    SHARE_NOTE: "share",
  };

  // AUTH SERVICE APIS
  static AUTH_SERVICE_API = `${EnvironmentService.BACKEND_API_BASE_URL()}${
    ApiConstants.API_VERSION.ONE
  }${ApiConstants.SERVICES.AUTH}/`;

  static LOGIN_API = `${ApiConstants.AUTH_SERVICE_API}${this.ENDPOINTS.LOGIN}`;
  static REGISTER_API = `${ApiConstants.AUTH_SERVICE_API}${this.ENDPOINTS.REGISTER}`;
  static LOGOUT_API = `${ApiConstants.AUTH_SERVICE_API}${this.ENDPOINTS.LOGOUT}`;
  static REFRESH_TOKEN_API = `${ApiConstants.AUTH_SERVICE_API}${this.ENDPOINTS.REFRESH}`;

  // NOTES SERVICE APIS
  static NOTES_API = `${EnvironmentService.BACKEND_API_BASE_URL()}${
    ApiConstants.API_VERSION.ONE
  }${ApiConstants.SERVICES.NOTES}/`;

  static CREATE_NOTE_API = `${ApiConstants.NOTES_API}${this.ENDPOINTS.CREATE_NOTE}`;
  static DELETE_NOTE_API = `${ApiConstants.NOTES_API}${this.ENDPOINTS.DELETE_NOTE}`;
  static UPDATE_NOTE_API = `${ApiConstants.NOTES_API}${this.ENDPOINTS.UPDATE_NOTE}`;
  static GET_NOTES_API = `${ApiConstants.NOTES_API}${this.ENDPOINTS.GET_NOTES}`;
  static SHARE_NOTE_API = `${ApiConstants.NOTES_API}${this.ENDPOINTS.SHARE_NOTE}`;
}
