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

const get = url =>
    fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then((respjson) => {
      console.log('Response from get', respjson);
      return respjson;
    })
    .catch((err) => {
      console.log('Error occured! See below.');
      throw err;
    });

export const signIn = (email, password) => post(`${urlRoot}/auth/login`, { email, password });
export const signup = (email, password, interests) => post(`${urlRoot}/auth/signup`, { email, password, interests });
export const google = () => get(`${urlRoot}/auth/google`);
export const createChat = (content, questionId, bounty, asker) => post(`${urlRoot}/activeChats/new`, { content, questionId, bounty, asker });
export const sendMessage = (chatId, content) => post(`${urlRoot}/messages/new`, { chatId, content });
export const createQuestion = (label, content) => post(`${urlRoot}/questions/new`, { label, content });
export const hotQuestions = limit => get(`${urlRoot}/questions/hot?limit=${limit}`);
