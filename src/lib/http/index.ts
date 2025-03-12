export const request = async <T>({
  path,
  method,
  body,
  headers,
  token,
}: {
  path: `/${string}`;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string | number>;
  token?: string;
}) => {
  try {
    const baseHeaders = new Headers();
    baseHeaders.append("Content-Type", "application/json");
    baseHeaders.append("Accepts", "application/json");
    if (token) {
      baseHeaders.append("Authorization", `Bearer ${token}`);
    }

    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        baseHeaders.append(key, value.toString());
      });
    }

    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}${path}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: baseHeaders,
    });

    if (response.status === 200) {
      return (await response.json()) as T;
    } else {
      let message = "An unknown error occurred, please try again.";

      try {
        const error = await response.json();
        message = error.message;
      } catch (error) {
        if (error instanceof Error) {
          message = error.message;
        }
      }

      throw new Error(message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw Error;
    } else {
      throw new Error("An unknown error occurred, please try again.");
    }
  }
};
