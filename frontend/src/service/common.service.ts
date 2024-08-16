import { getAccessToken, getOrigin } from "../shared/utils/helpers";

export default class CommonService {
  static async invokeHttpCallFetch(
    method: string,
    url: string,
    data?: any,
    retries = 3,
    backoff = 300
  ): Promise<any> {
    const clientOrigin = getOrigin();
    const retryCodes = [401, 408, 500, 502, 503, 504, 522, 524];

    const httpObject: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "no-referrer",
        "Access-Control-Allow-Origin": clientOrigin,
        "Access-Control-Allow-Credentials": "true",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    if (data && ["PUT", "POST"].includes(method)) {
      httpObject.body = JSON.stringify(data);
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res: Response = await fetch(url, httpObject);
        const status = res.status;

        if (status === 429) {
          return { status: 429 };
        }

        let resData;
        try {
          resData = await res.json();
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          throw new Error("Failed to parse JSON response");
        }

        if (status >= 200 && status < 300) {
          return resData;
        }

        if (status === 401) {
          if (attempt < retries) {
            // have to implement refresh function
          } else {
            throw new Error("Unauthorized: Unable to refresh token");
          }
        } else if (status === 403) {
          console.error(
            "Access forbidden: You do not have permission to access this resource."
          );
          throw new Error(
            "Access forbidden: You do not have permission to access this resource."
          );
        } else if (retryCodes.includes(status)) {
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, backoff));
            backoff *= 2;
          } else {
            throw new Error(`Request failed after ${retries + 1} attempts.`);
          }
        } else {
          return resData;
        }
      } catch (err) {
        if (attempt === retries) {
          console.error("Network error after maximum retries:", err);
          throw new Error("Network error occurred after maximum retries");
        }
      }
    }
  }
}
