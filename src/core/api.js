import axios from 'axios';
import { isEmpty, isObject } from 'underscore';

const API_URL = 'http://ergast.com/api/f1/';

// ----- Helpers ----- //

// Get Api Url
const getApiUrl = () => `${API_URL}`;

// defaults for axios
const api = axios.create({
  baseURL: getApiUrl(),
});

// Format params for api call
const formatParams = (payload, key) => {
  let params = payload;
  if (!isObject(payload)) {
    params = {};
    params[key || 'id'] = payload;
  }

  return params;
};

// ----- Api Functions ----- //

function fetchApi(opts, headers) {
  const data = opts.method.toUpperCase() === 'GET' ? null : opts.body;

  const options = {
    method: opts.method,
    url: opts.url,
    params: opts.params,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (opts.method.toUpperCase() !== 'GET') {
    options.data = data;
  }

  if (!isEmpty(headers)) {
    options.headers = { ...options.headers, ...headers };
  }

  return api(options);
}

export { getApiUrl, formatParams, fetchApi };
