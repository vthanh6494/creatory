interface PostParams {
  url: string;
  headers?: any;
  payload: any;
}

interface FetchParams {
  url: string;
  headers?: any;
}

const responseProcess = (response: any) => {
  return response.json();
};

export const POST = async ({ url, headers, payload }: PostParams) => {
  const response = await fetch(url, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return responseProcess(response);
};

export const setAuth = () => {
  localStorage.setItem("authorization", "true");
};

export const FETCH = async ({ url, headers }: FetchParams) => {
  const response = await fetch(url, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  return responseProcess(response);
};
