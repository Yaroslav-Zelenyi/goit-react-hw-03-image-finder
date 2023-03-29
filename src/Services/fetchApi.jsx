const KEY = '34063298-757445484d2b824298afb2c65';
const URL = 'https://pixabay.com/api/';

export async function fetchApi(query, page) {
  const response = await fetch(
    `${URL}?key=${KEY}&q=${query}&page=${page}&per_page=12`
  );

  if (!response.ok) {
    throw new Error(`Error fetching API: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
