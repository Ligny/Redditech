
const apiRequest = async (url, method, accessToken) => {
  return fetchApi(url, method, accessToken).then((response) => response.json());
}

const fetchApi = async (url, method, accessToken) => {
  return fetch(url, {
    method,
    data: `read`,
    headers: new Headers({
      'Authorization': `Bearer ${accessToken}`
    })
  })
}

export default apiRequest;