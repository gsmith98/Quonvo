import querystring from 'querystring';

const urlRoot = 'http://localhost:3000'; // TODO toggle on proces.env

// TODO remove console logs (or log only in dev env)
const post = (url, data) =>
  fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: querystring.stringify(data)
  })
  .then(resp => resp.json())
  .then((respjson) => {
    console.log('Response from post:', respjson);
    return respjson;
  })
  .catch((err) => {
    console.log('Error occured! See below.');
    throw err;
  });

export const signIn = (email, password) => post(`${urlRoot}/auth/login`, { email, password });
