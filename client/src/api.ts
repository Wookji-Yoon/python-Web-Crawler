export async function fetchAutoComplete(search: string) {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.jobplanet.co.kr/autocomplete/autocomplete/suggest.json?term=${search}`
    );
    const json = await response.json();
    return json.companies;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchReviews(id: any, page: number) {
  const response = await fetch(
    `http://localhost:5000/reviews?company_id=${id}&last_page=${page}`
  );
  const json = await response.json();
  return json;
}
