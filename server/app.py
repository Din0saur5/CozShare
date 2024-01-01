
from flask import request, session
from flask_restful import Resource
from config import app, db, api
from models import User
from sqlalchemy.exc import IntegrityError
@app.route('/')
def index():
  return '<h1>Server Home</h1>'


@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint not in {'check_session', 'login', 'signup', 'check_user'}:
        return {'error': 'Unauthorized'}, 401



class Signup(Resource):
  def post(self):
    email = request.get_json().get('email')
    display_name = request.get_json().get('display_name')
    password = request.get_json().get('password')
    if email and password and not User.query.filter(User.email == email).first():
        new_user = User(
        email = email,
        display_name = display_name,
        )
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422

class Login(Resource):
  def post(self):
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = User.query.filter(User.email == email).first()
    if user:
      if user.authenticate(password):
        session['user_id'] = user.id
        if session['user_id']:
          return user.to_dict(), 200
        return {'error': 'session could not be established'}, 400
      return {'error': "Unauthorized"}, 401
    return {'error': "User Not Found"}, 404
class CheckSession(Resource):
  def get(self):
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    return {'error': 'Unauthorized'}, 401

class CheckDisplayName(Resource):
    def get(self, display_name):
        user = User.query.filter(User.display_name == display_name).first()
        if user:
            return {}, 409
        else:
            return {}, 200

class Logout(Resource):
  def delete(self):
    if session.get('user_id'):
        session['user_id'] = None
        return {}, 204
    return {'error': 'Unauthorized'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckDisplayName, '/check_user/<display_name>', endpoint='check_user')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
if __name__ == '__main__':
  app.run(port=5555, debug=True)