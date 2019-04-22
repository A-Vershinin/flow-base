/* @flow */

//============ Примеры Async/Await ==============

// Тип ответа
type RespApiType = { status: number, message: string };

// Ответ от сервера
const ApiResponseSuccess: RespApiType = {
  status: 200,
  message: "This is successful response"
};

// callApi util
const callApi = (path): Promise<RespApiType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ApiResponseSuccess);
    }, 1000);
  });
};

const api = {
  getStats: async (path: string): Promise<RespApiType> => {
    const response: RespApiType = await callApi(path);
    const { status } = response;

    if (status !== 200) {
      throw new Error("Get Error from api!");
    }

    return response;
  }
};
