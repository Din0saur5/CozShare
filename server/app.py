
from flask import Flask, request, session, render_template, make_response
from flask_restful import Resource
from config import app, db, api
from models import User
from sqlalchemy.exc import IntegrityError
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint in {'/users',}:
        return {'error': 'Unauthorized blah'}, 401

class AllUsers(Resource):
  def get(self):
    users = User.query.all()
    rb= [user.to_dict() for user in users] 
    return make_response(rb, 200)

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
  
  
class UserById(Resource):
  def get(self, id):
    u = User.query.filter(User.id == id).first()
    if u:
        
        rb = u.to_dict()
        return make_response(rb, 200)    
    else:
        rb = {
            "error": "User not found"
        }
        return make_response(rb, 404)
  
  def patch(self,id):
    u = User.query.filter(User.id == id ).first()
    if u:
        try:
            for attr in request.json:
                setattr(u, attr, request.json.get(attr))
                db.session.commit()
                rb = u.to_dict()
            return make_response(rb, 202)
        except ValueError:
            rb = {
            "errors": ["validation errors"]
            }
            return make_response(rb, 400)
    else:
        rb ={
        "error": "Scientist not found"
        }
        return make_response(rb, 404)
  
  def delete(self, id):
    u = User.query.filter(User.id == id).first() 
    if u:
        db.session.delete(u)
        db.session.commit()
        return make_response({}, 204)
    else:
        rb = {
            "error": "User not found"
        }
        return make_response(rb, 404)
      
class GetFollowers(Resource):
  def get(self, id):
    
    user = User.query.filter(User.id == id).first() 
    if not user:
      return {'error': 'User not found'}, 404

      # Assuming 'followers' is a list of user IDs
    followers_list = user.followers

      # Query for all users whose IDs are in the followers list
    followers = User.query.filter(User.id.in_(followers_list)).all()
      
      # Serialize the follower data
    rb= [f.to_dict(only=('id', 'profile_pic','display_name')) for f in followers] 
      
    return make_response(rb, 200)
  
class GetFollowing(Resource):
  def get(self, id):
    
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404

      # Assuming 'followers' is a list of user IDs
    following_list = user.following

      # Query for all users whose IDs are in the followers list
    following = User.query.filter(User.id.in_(following_list)).all()
      
      # Serialize the follower data
    rb= [f.to_dict(only=('id', 'profile_pic','display_name')) for f in following] 
      
    return make_response(rb, 200)

class GetFollows(Resource):
  def get(self, id):
    
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404

    
    following_list = user.following
    
    followers_list = user.followers
    rb1 = []
    rb2 = []
    if following_list:
      following = User.query.filter(User.id.in_(following_list)).all()
      rb1= [f.to_dict(only=('id', 'profile_pic','display_name')) for f in following] 
    
    if followers_list:
      followers = User.query.filter(User.id.in_(followers_list)).all()  
      rb2 = [f.to_dict(only=('id', 'profile_pic','display_name')) for f in followers]  
      # Serialize the follower data
    unique_dicts = {}
    for d in rb1 + rb2:
    # Assuming 'id' is a unique key
      unique_dicts[d['id']] = d

    deduped_combined = list(unique_dicts.values())
    
    return make_response( deduped_combined, 200)
  
api.add_resource(GetFollows, '/follows/<uuid:id>')
api.add_resource(GetFollowing, '/following/<uuid:id>')  
api.add_resource(GetFollowers, '/followers/<uuid:id>')
api.add_resource(UserById, '/users/<uuid:id>')
api.add_resource(AllUsers, '/users', endpoint='users')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckDisplayName, '/check_user/<display_name>', endpoint='check_user')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
if __name__ == '__main__':
  app.run(port=5555, debug=True)