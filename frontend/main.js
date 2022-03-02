'use strict';

/*
loginSubmit.onclick = () => {
  fetch(`${host}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: loginName.value,
      password: loginPassword.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      p(localStorage.getItem('token'));
    });
};

registerSubmit.onclick = () => {
  fetch(`${host}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: registerName.value,
      bio: registerBio.value,
      password: registerPassword.value,
    }),
  })
    .then((res) => res.json())
    .then(p);
};

usersIdGetSubmit.onclick = () => {
  fetch(`${host}/users/${usersIdGetId.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then(p);
};

usersGetSubmit.onclick = () => {
  fetch(`${host}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then(p);
};

threadsGetSubmit.onclick = () => {
  const params = {
    per_page: threadsGetPerPage.value,
    page: threadsGetPage.value,
    q: threadsGetQ.value,
  };
  const queryParams = new URLSearchParams(params);
  fetch(`${host}/threads?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then(p);
};

threadsPostSubmit.onclick = () => {
  fetch(`${host}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: threadsPostTitle.value,
    }),
  })
    .then((res) => res.json())
    .then(p);
};

repliesGetSubmit.onclick = () => {
  const params = {
    thread_id: repliesGetThreadId.value,
  };
  const queryParams = new URLSearchParams(params);
  fetch(`${host}/replies?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then(p);
};

repliesPostSubmit.onclick = () => {
  fetch(`${host}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      thread_id: repliesPostThreadId.value,
      text: repliesPostText.value,
    }),
  })
    .then((res) => res.json())
    .then(p);
};

repliesPatchSubmit.onclick = () => {
  fetch(`${host}/replies/${repliesPatchId.value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      text: repliesPatchText.value,
    }),
  })
    .then((res) => res.json())
    .then(p);
};
*/

const p = console.log;
const host = 'http://localhost';

const addOption = (select, value) => {
  const option = document.createElement('option');
  option.text = value;
  option.value = value;
  select.appendChild(option);
};

const init = () => {
  const num = 24;
  for (let i = 1; i <= num; i++) {
    addOption(select1, i);
  }
};

const fetchJson = (path, params = {}) => {
  const queryParams = new URLSearchParams(params);
  const url = `${host}/${path}?${queryParams}`;
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

const run = async () => {
  const id = select1.value;
  const delimiter = await fetchJson('delimiter');
  const first_text = await fetchJson(`first/${id}`);
  const second_text = await fetchJson(`second/${id}`, { first_text });
  const third_text = await fetchJson(`third/${id}`, { first_text, second_text });
  const full_text = `${first_text}${delimiter}${second_text}${delimiter}${third_text}`;
  const check_result = await fetchJson(`check/${id}`, { full_text });
  result1.textContent = check_result;
};
