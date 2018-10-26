import publicPath from '../utils/get_build_path';

const DATA_PATH = `${publicPath}/assets/data.json`;

export function getData() {
  return fetch(DATA_PATH)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json();
    });
}
