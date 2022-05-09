from flask import Flask, request
from flask_cors import CORS
from scrapper import get_reviews

app = Flask(__name__)
CORS(app)

@app.route('/reviews')
def index():
    company_id= int(request.args.get('company_id'))
    last_page = int(request.args.get('last_page'))
    reviews = get_reviews(company_id, last_page)
    return reviews
        

if __name__ == '__main__':
    app.run(debug=True)