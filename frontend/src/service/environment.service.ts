export default class EnvironmentService {
  static BACKEND_API_BASE_URL() {
    return process.env.BACKEND_API_BASE_URL || "http://localhost:7001";
  }
}
