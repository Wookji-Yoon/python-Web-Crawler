from ast import Str
from bs4 import BeautifulSoup
import requests


def set_url(company_id):
    url = f"https://www.jobplanet.co.kr/companies/{company_id}/reviews?"
    # for i in range(year, 2023):
    #     url = url + f"year%5B%5D={i}&"
    return (url)


def login(session):
    url_login = "https://www.jobplanet.co.kr/users/sign_in?_nav=gb"
    login_info = {
        "user[email]": "jwshin@fma-consulting.com",
        "user[password]": "jobplanet2021"
    }
    session.post(url_login, data=login_info)
    return session


def get_last_page(url):
    resul = requests.get(url)
    soup = BeautifulSoup(resul.text, "html.parser")
    container = soup.find("div", {"id": "viewReviewsTitle"})
    span = container.find_all("span")[-1]
    last_page = int(span.string)
    #last_page=(last_page//5)*5
    last_page = 1
    return last_page


def extract_reviews(session, url, last_page):
    reviews = []
    for page in range(1, last_page+1):
        result = session.get(f"{url}page={page}")
        soup = BeautifulSoup(result.text, "html.parser")

        cards = soup.find_all("div", {"class": "content_wrap"})
        for card in cards:

            #user_info : 직군, 근무지, 날짜, 재직여부
            user_info = card.find_all("span", {"class": "txt1"})

            #직군, 근무지, 날짜
            job_group = user_info[0].string
            location = user_info[2].string
            date = user_info[3].string
            #재직여부
            working_refine = "전" in user_info[1].string
            working = "전직원" if working_refine else "현직원"

            #comment : 총평, 장점, 단점, 경영진에 바라는 점, 추천 여부
            comment_part = card.find("div", {"class": "content_body_ty1"})
            comment_part.find("h2").span.decompose()
            summary = comment_part.find("h2").get_text().strip().strip('"')
            comment = comment_part.find_all("span")
            merit = comment[0].get_text()
            disadvantage = comment[1].get_text()
            wish = comment[2].get_text()

            recommend = comment_part.find("p", {"class": "recommend"}).get_text()

            #별점
            stars_refine = card.find("div", {"class": "star_score"})["style"]
            stars_dictionary = {
                "width:20%;": 1,
                "width:40%;": 2,
                "width:60%;": 3,
                "width:80%;": 4,
                "width:100%;": 5
            }
            stars = stars_dictionary[stars_refine]

            review = {
                "직군": job_group,
                "재직여부": working,
                "근무지": location,
                "날짜": date,
                "별점": stars,
                "총평": summary,
                "장점": merit,
                "단점": disadvantage,
                "경영진에 바라는 점": wish,
                "추천여부": recommend
            }
            reviews.append(review)

            columns = [{ "label" : "직군", "value" : "직군"},{ "label" : "재직여부", "value" : "재직여부"},{ "label" : "근무지", "value" :  "근무지"},{ "label" : "날짜", "value" :  "날짜"},{ "label" : "별점", "value" : "별점"},{ "label" : "총평", "value" : "총평"},{ "label" : "장점", "value" : "장점"},{ "label" : "단점", "value" :  "단점"},{ "label" : "경영진에 바라는 점", "value" :  "경영진에 바라는 점"},{ "label" : "추천여부", "value" :  "추천여부"}]
            data = {"sheet" : "Reviews", "columns": columns, "content": reviews}
    return data
