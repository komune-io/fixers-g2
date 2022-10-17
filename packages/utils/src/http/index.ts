export type HttpContentType =
  | "application/json"
  | "text/plain"
  | "application/octet-stream"
  | "none";
export interface HttpOptions {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: string;
  formData?: FormData;
  jwt?: string;
  contentType?: HttpContentType;
  returnType?: "json" | "text" | "objectUrl";
  errorHandler?: (error: Error, responseCode?: number) => void;
  withAccessControl?: boolean;
}

export const request = <T>(options: HttpOptions): Promise<Nullable<T>> => {
  const {
    method,
    url,
    body,
    formData,
    contentType = "application/json",
    jwt,
    errorHandler = () => {},
    returnType = "json",
    withAccessControl = true,
  } = options;
  return fetch(url, {
    method: method,
    headers: {
      ...(jwt !== undefined && jwt !== ""
        ? {
            Authorization: `Bearer ${jwt}`,
          }
        : {}),
      ...(contentType !== "none"
        ? {
            "Content-Type": contentType,
          }
        : {}),
      ...(withAccessControl
        ? {
            "Access-Control-Allow-Origin": "*",
          }
        : {}),
    },
    body: formData ?? body,
  })
    .then((response) => {
      if (!response.ok) {
        response
          .text()
          .then((error) => {
            throw new Error(error);
          })
          .catch((error) => {
            errorHandler(error, response.status);
            throw error;
          });
        return;
      } else {
        if (returnType === "json") {
          return response.json();
        }
        if (returnType === "text") {
          return response.text();
        }
        const blob = response.blob().then((myBlob: Blob) => {
          return URL.createObjectURL(myBlob);
        });
        return blob;
      }
    })
    .catch((error) => {
      errorHandler(error, 600);
      throw error;
    });
};
