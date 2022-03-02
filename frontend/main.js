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
  const path = `first/${id}`;
  const delimiter = await fetchJson('delimiter');
  const firstJson = await fetchJson(path);

  p(delimiter, firstJson);
};

//Ajaxで情報を取得
const currentWeather = () => {
  const city = document.getElementById('city').value;
  const api_key = '4b5774e9f3d2a07b84f0f2f88e486224';
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api_key + '&lang=ja&units=metric';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const obj = JSON.parse(xhr.responseText);
      const weather = obj.weather[0].description; //天気
      const temperature = obj.main.temp; //気温
      const humidity = obj.main.humidity; //湿度
      document.getElementById('weather').innerText = weather;
      document.getElementById('humidity').innerText = humidity;
      document.getElementById('temperature').innerText = temperature;
    }
  };
};
