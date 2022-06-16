import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const request = axios.create({
  baseURL: publicRuntimeConfig.requestBaseUrl,
  withCredentials: true,
});

request.interceptors.response.use(
  (res) => {
    if ((res.data.code ?? 200) !== 200) {
      console.log(res.data);
      return null;
    }
    return res.data;
  },
  (e) => {
    console.log(e);
    return null;
  },
);

export default request;
