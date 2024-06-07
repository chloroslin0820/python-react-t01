# TODO: UPDATE THIS PAGE FROM DEPLOYMENT
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

import routes

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)