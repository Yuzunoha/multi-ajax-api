'use strict';

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
