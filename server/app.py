
from flask import Flask, request, session, render_template, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Post, Comment, Event, EventPosts, Members, PostComment
from sqlalchemy.exc import IntegrityError
import uuid
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
  
  def patch(self, id):
    u = User.query.filter(User.id == id).first()
    if u:
        try:
            # Assuming you have a list of allowed attributes to update
            allowed_attrs = ['display_name', 'email', 'bio', 'followers', 'following', 'catchphrase','profile_pic' ]  # example attributes
            for attr in request.json:
                if attr in allowed_attrs:
                    setattr(u, attr, request.json.get(attr))

            db.session.commit()
            rb = u.to_dict()
            return make_response(rb, 202)

        except (ValueError, AttributeError, IntegrityError) as e:
            db.session.rollback()  # Rollback in case of any exception
            rb = {"errors": ["Validation errors", str(e)]}
            return make_response(rb, 400)

    else:
        rb = {"error": "User not found"}
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
    rb= [f.to_dict(only=('id', 'profile_pic','display_name','followers','following', 'catchphrase')) for f in followers] 
      
    return make_response(rb, 200)
  
class GetFollowing(Resource):
  def get(self, id):
    print(id)
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404

      # Assuming 'followers' is a list of user IDs
    following_list = user.following
    print(user.following)
      # Query for all users whose IDs are in the followers list
    following = User.query.filter(User.id.in_(following_list)).all()
    
      # Serialize the follower data
    rb= [f.to_dict(only=('id', 'profile_pic','display_name', 'catchphrase','followers','following')) for f in following] 
     
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
  
class GetFeed(Resource):
  def get(self,id):
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404

    following_list = user.following
  
    limit = request.args.get('limit', 20, type=int)
    offset = request.args.get('offset', 0, type=int)

    posts = Post.query.filter(Post.user_id.in_(following_list)) \
                      .order_by(Post.created.desc()) \
                      .limit(limit) \
                      .offset(offset) \
                      .all()

    
    posts_data = [post.to_dict() for post in posts]  

    return make_response(posts_data, 200)
class HandleFollows(Resource):
    def post(self):
        # Log incoming data and types
        incoming_data = request.get_json()
        print("Received data:", incoming_data, "Type:", type(incoming_data))

        target_user_id = incoming_data.get('target_user_id')
        print("Target User ID:", target_user_id, "Type:", type(target_user_id))

        if not target_user_id:
            return make_response({"error": "Missing user IDs"}, 400)

        session_user_id = str(session.get('user_id'))
        print("Session User ID:", session_user_id, "Type:", type(session_user_id))

        user = User.query.filter(User.id == session_user_id).first()
        target_user = User.query.filter(User.id == target_user_id).first()

        if not user:
            print("User not found with ID:", session_user_id)
        if not target_user:
            print("Target user not found with ID:", target_user_id)

        if not user or not target_user:
            return make_response({"error": "User not found"}, 404)

        print("User following before action:", user.following, "Type:", type(user.following))
        print("Target user followers before action:", target_user.followers, "Type:", type(target_user.followers))

        if str(target_user_id) in user.following:
          # Create a new list excluding target_user_id and assign it back
          user.following = [uid for uid in user.following if uid != str(target_user_id)]
          target_user.followers = [uid for uid in target_user.followers if uid != str(user.id)]
          action = "unfollowed"
        else:
            print("Follow action")
            user.following = user.following + [str(target_user.id)]
            target_user.followers = target_user.followers + [str(user.id)]
            action = "followed"

        print("User following after action:", user.following)
        print("Target user followers after action:", target_user.followers)

        try:
            db.session.commit()
            print("Database commit successful")
            return make_response({"action": f"{action}", "user":user.to_dict(), "target":target_user.to_dict()}, 201)
        except Exception as e:
            print("Error on commit:", e)
            db.session.rollback()
            return make_response({"error": "Database commit failed"}, 500)
          
          
          
class CreateEvent(Resource):
  def post(self):
    data = request.json
    print("Received event data:", data)

    try:
        new_event = Event(
            admin_id=uuid.UUID(data['admin_id']),
            eventTime=data['eventTime'],
            profile_pic=data['profile_pic'],
            location=data['location'],
            display_name=data['display_name'],
            description=data['description']
        )
        db.session.add(new_event)
        db.session.commit()
        print("New event created:", new_event.id)
        rb = new_event.to_dict()
        return make_response(rb ,201)
    except Exception as e:
        print("Error creating event:", e)
        db.session.rollback()
        return make_response({"error": "Error creating event"}, 500)
      
      
     
      
      
class AllMembers(Resource):
  def post(self):
    data = request.json
    print("Received member data:", data)

    try:
        new_member = Members(
            user_id=uuid.UUID(data['user_id']),
            event_id=uuid.UUID(data['event_id'])
        )
        db.session.add(new_member)
        db.session.commit()
        print("New member added:", new_member.id)
        return make_response(new_member.to_dict(),201)
    except Exception as e:
        print("Error adding member:", e)
        db.session.rollback()
        return make_response({"error": "Error adding member"}, 500)
      

class AllPost(Resource):
  
  def post(self):
    data = request.get_json()
    print("Received post data:", data)

    try:
        new_post = Post(
            user_id=uuid.UUID(data['user_id']),
            post_type=data['post_type'],
            media=data['media'],
            caption=data['caption'],
            likes=data['likes']
        )
        db.session.add(new_post)
        db.session.commit()
        print("New post created:", new_post.id)

        response_data = new_post.to_dict()
        return make_response(response_data, 201)  # Flask-RESTful converts the dict to JSON
    except Exception as e:
        print("Error creating post:", e)
        db.session.rollback()
        return make_response({'error': 'Error creating post'}, 500)

class CreateEventPost(Resource):
    def post(self):
        data = request.get_json()
        print("Received event-post data:", data)

        try:
            new_event_post = EventPosts(
                event_id=uuid.UUID(data['event_id']),
                post_id=uuid.UUID(data['post_id'])
            )
            db.session.add(new_event_post)
            db.session.commit()
            print("New event-post entry created:", new_event_post.id)

            response_data = new_event_post.to_dict()
            return make_response(response_data, 201)
        except Exception as e:
            print("Error creating event-post entry:", e)
            db.session.rollback()
            return make_response({'error': 'Error creating event-post entry'}, 500)

class GetGroupsByUserId(Resource):
  def get(self, id):
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404
    userGroups = user.events
    rb =  [event.to_dict(rules=('-admin',)) for event in userGroups]   
    return make_response(rb, 200) 
    

api.add_resource(GetGroupsByUserId, '/events/<uuid:id>')
api.add_resource(CreateEventPost, '/event-posts')
api.add_resource(AllPost, '/posts')    
api.add_resource(AllMembers, '/members')    
api.add_resource(CreateEvent, '/events')
api.add_resource(HandleFollows, '/handle_follows')
api.add_resource(GetFeed, '/feed/<uuid:id>')  
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