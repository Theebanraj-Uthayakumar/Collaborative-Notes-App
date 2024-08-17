import EnvironmentService from "../../service/environment.service";

describe("EnvironmentService", () => {
  beforeEach(() => {
    delete process.env.BACKEND_API_BASE_URL;
  });

  it("should return default URL when environment variable is not set", () => {
    const result = EnvironmentService.BACKEND_API_BASE_URL();
    expect(result).toBe("http://localhost:7001");
  });

  it("should return environment variable value when set", () => {
    process.env.BACKEND_API_BASE_URL = "http://test-api-url.com";

    const result = EnvironmentService.BACKEND_API_BASE_URL();
    expect(result).toBe("http://test-api-url.com");
  });
});
