from jobplanet import login, set_url, get_last_page, extract_reviews
import requests


def get_reviews(company_id, last_page):
  session = login(requests.Session())
  url=set_url(company_id)
  # last_page = get_last_page(url)
  reviews= extract_reviews(session, url, last_page)
  return(reviews)