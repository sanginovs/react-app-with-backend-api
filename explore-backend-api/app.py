from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, DateTime
import os
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_mail import Mail, Message
import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sqlite.db')
app.config['JWT_SECRET_KEY'] = 'super-secret'  # change this IRL
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/workshops": {"origins": "http://localhost:3000"},
r"/workshops/create":{"origins": "http://localhost:3000"},
r"/users":{"origins": "http://localhost:3000"}, r"/register": {"origins": "http://localhost:3000"}
})
#app.config['MAIL_SERVER'] = 'smtp.mailtrap.io'
#app.config['MAIL_USERNAME'] = os.environ['MAIL_USERNAME']
#app.config['MAIL_PASSWORD'] = os.environ['MAIL_PASSWORD']

db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)
mail = Mail(app)


@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database dropped!')


@app.cli.command('db_seed')
def db_seed():
    test_workshop = Workshop(title='How to cook eggs',
                                description="This online workshop is about cooking eggs",
                                speaker="Sher Sanginov",
                                file='/home/shers/folders/img.txt',
                                )


    db.session.add(test_workshop)
    db.session.commit()
    print("done adding")

    test_user = User(first_name='Sher',
                     last_name='Sanginov',
                     username='shers',
                     password='pass1234',
                     discuss='Coding Cooking',
                     origin = "USA"
                     )

    db.session.add(test_user)
    db.session.commit()
    print('Database seeded!')


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/users')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def users():
    qs = request.args.get('queryString')
    if(qs):
        qs = qs.split()
        query = User.query.all()
        res = []
        for record in query:
            search_discuss = record.discuss.split()
            for word in qs:
                for word1 in search_discuss:
                    if(word.lower() == word1.lower()):
                        res.append(record)
                        break
                else:
                    continue
                break
        result = users_schema.dump(res)
        return jsonify(result.data), 200



@app.route('/workshops')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def workshops():
    print("hi")
    name = request.args.get('queryString')
    #split query string with +
    if(name):
        print(name)
        name = name.split()
        query = Workshop.query.all()
        res = []
        for record in query:
            search_title = record.title.split()
            search_description = record.description.split()
            search_arr = search_title + search_description
            for word in name:
                for word1 in search_arr:
                    if(word.lower() == word1.lower()):
                        res.append(record)
                        break
                else:
                    continue
                break
        print("All records: ", res)
        #rank by the one that has the most words
        result = workshop_schema.dump(res)
        return jsonify(result.data)

    response = jsonify("you are not old enough.")
    #response.headers.add('Access-Control-Allow-Origin', '*')
    #print(response.headers)
    print("nothing")
    return response

@app.route('/workshops/create', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
#@jwt_required
def create_workshop():
    title = request.form['title']
    description = request.form['description']
    date = request.form['date']
    speaker = request.form['speaker']
    print(title, description, date, speaker)
    #file = request.form['file']
    #test = Planet.query.filter_by(planet_name=planet_name).first()
    new_workshop = Workshop(title=title,
                        description=description,
                        speaker=speaker,
                        file=None,
                        schedule=date)
    db.session.add(new_workshop)
    db.session.commit()
    return jsonify(message="You added a workshop"), 201


@app.route('/register', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def register():
    username = request.form['username']
    test = User.query.filter_by(username=username).first()
    if test:
        return jsonify(message='That email already exists.'), 409
    else:
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        password = request.form['password']
        discuss  = request.form['discuss']
        user = User(first_name=first_name, last_name=last_name, username=username, password=password, discuss=discuss)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User created successfully."), 201


@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        email = request.json['email']
        password = request.json['password']
    else:
        email = request.form['email']
        password = request.form['password']

    test = User.query.filter_by(email=email, password=password).first()
    if test:
        access_token = create_access_token(identity=email)
        return jsonify(message="Login succeeded!", access_token=access_token)
    else:
        return jsonify(message="Bad email or password"), 401


# database models
class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    username=Column(String(50), unique=True)
    password=Column(String)
    discuss = Column(String)
    origin = Column(String)


class Workshop(db.Model):
    __tablename__ = 'workshops'
    workshop_id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    speaker = Column(String)
    file = Column(String)
    schedule = Column(String)
    #schedule = Column(DateTime, default=datetime.datetime.utcnow)



class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'username', 'password', 'discuss', 'origin')


class WorkshopSchema(ma.Schema):
    class Meta:
        fields = ('workshop_id', 'title', 'description', 'speaker', 'file', 'schedule')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

workshop_schema = WorkshopSchema()
workshop_schema = WorkshopSchema(many=True)

if __name__ == '__main__':
    app.run(debug=True)
