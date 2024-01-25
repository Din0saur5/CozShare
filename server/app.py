
from flask import Flask, request, session, render_template, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Post, Comment, Event, Members
from sqlalchemy import and_, text, or_
from sqlalchemy.exc import IntegrityError
import uuid
import random

def generate_random_hex_color():
    # Generates a random hex color
            return ''.join(random.choices('0123456789ABCDEF', k=6))
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and request.endpoint in {'/signup','/login','/check_session','/check_user'}:
        return {'error': 'Unauthorized'}, 401


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
        profile_pic = f'https://ui-avatars.com/api/?background={generate_random_hex_color()}'
        )
        new_user.password_hash = password
        try:
            
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
            return make_response(new_user.to_dict(), 201)
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
          return make_response(user.to_dict(), 200)
        return {'error': 'session could not be established'}, 400
      return {'error': "Unauthorized"}, 401
    return {'error': "User Not Found"}, 404
class CheckSession(Resource):
  def get(self):
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return make_response(user.to_dict(), 200)
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
            session.pop('user_id', None)
            response = make_response({"message": "Logged out successfully"}, 200)
            response.set_cookie('id', '', expires=0, path='/', httponly=True)  # Clear the 'id' cookie
            return response
        return make_response({'error': 'Unauthorized'}, 401)

  
  
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
  
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    eventIDs = [event.id for event in user.events]
    posts = Post.query\
            .filter(
                or_(
                    Post.event_id.is_(None),
                    Post.event_id.in_(eventIDs)
                ),
                Post.user_id.in_(following_list)
            )\
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
            likes=[],
            created=data['created'],
            event_id=data.get('event_id')
        )
        db.session.add(new_post)
        db.session.commit()

        response_data = new_post.to_dict()
        print("New post created:", response_data)
        return make_response(response_data, 201)  # Flask-RESTful converts the dict to JSON
    except Exception as e:
        print("Error creating post:", e)
        db.session.rollback()
        return make_response({'error': 'Error creating post'}, 500)


class GetGroupsByUserId(Resource):
  def get(self, id):
    user = User.query.filter(User.id == id).first()
    if not user:
      return {'error': 'User not found'}, 404
    userGroups = user.events
    rb =  [event.to_dict(rules=('-admin',)) for event in userGroups]   
    return make_response(rb, 200) 
  
class EventsById(Resource):
  def get(self, id):
    event = Event.query.filter(Event.id == id).first()
    if not event:
      return {'error': 'Event not found'}, 404
    return make_response(event.to_dict(rules=('-admin',)), 200)
  
  def delete(self, id):
    e = Event.query.filter(Event.id == id).first() 
    if e:
        db.session.delete(e)
        db.session.commit()
        return make_response({}, 204)
    else:
        rb = {
            "error": "Event not found"
        }
        return make_response(rb, 404)
class MembersByEventId(Resource):
  def get(self,id):
    members = Members.query.filter(Members.event_id == id).all()
    if not members:
      return {'error': 'Members not found'}, 404
    else:
      membersData = []
      for member in members:
        memberData= User.query.filter(User.id == member.user_id).first()
        membersData.append(memberData.to_dict(rules=('-email', '-bio')))
      return make_response(membersData,200)
    
  
    
    
class SearchResource(Resource):
    def post(self, search_type):
        data = request.get_json()
        search_query = data.get("query")
        
        if not search_query:
            return make_response({"error": "No search query provided"}, 400)

        search_query = f"%{search_query}%"
        
        if search_type.lower() == 'users':
            results = User.query.filter(User.display_name.ilike(search_query)).all()
        elif search_type.lower() == 'events':
            results = Event.query.filter(Event.display_name.ilike(search_query)).all()
        else:
            return make_response({"error": "Invalid search type"}, 400)

        return make_response([item.to_dict() for item in results], 200)


class DeleteMember(Resource):
    def delete(self, user_id, event_id):
        member = Members.query.filter(
            and_(Members.user_id == user_id, Members.event_id == event_id)
        ).first()

        if member:
            db.session.delete(member)
            db.session.commit()
            return make_response({"message": "member deleted"}, 204)
        else:
            rb = {"error": "Member not found"}
            return make_response(rb, 404)

class UpdatePassword(Resource):
    def patch(self):
        data = request.json
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')

        user_id = session.get('user_id')
        if not user_id:
            return make_response({"error": "User not authenticated"}, 401)

        user = User.query.filter_by(id=user_id).first()


        # Check if user exists and old password is correct
        if user and user.authenticate(old_password):
            #hashing is done via models
            user.password_hash = new_password

            try:
                db.session.commit()
                return make_response({"message": "Password updated successfully"}, 200)
            except IntegrityError:
                db.session.rollback()
                return make_response({"error": "Failed to update password"}, 500)
        else:
            return make_response({"error": "Invalid credentials"}, 401)


class DeleteAccount(Resource):
    def delete(self):
        user_id = session.get('user_id')
        if not user_id:
            return make_response({"error": "User not found"}, 404)
        user = db.session.get(User, user_id)  
        if not user:
            return make_response({"error": "User not found"}, 404)
        try:
           # Convert user.following and user.followers to lists of strings if they are UUIDs
          following_ids = [uuid.UUID(uid) for uid in user.following]
          followers_ids = [uuid.UUID(uid) for uid in user.followers]

          # Remove the user's id from the followers' list of all users they are following
          db.session.execute(text(
              "UPDATE users SET followers = array_remove(followers, :user_id) WHERE id = ANY(:following)"
          ), {'user_id': str(user_id), 'following': following_ids})

          # Remove the user's id from the following list of all users that follow them
          db.session.execute(text(
              "UPDATE users SET following = array_remove(following, :user_id) WHERE id = ANY(:followers)"
          ), {'user_id': str(user_id), 'followers': followers_ids})
          db.session.delete(user)
          db.session.commit()
          return make_response({"message": "Account deleted successfully"}, 200)
        except Exception as e:
          db.session.rollback()
          print(e)
          return make_response({"error": f"Failed to delete account: {e}"}, 500)

class GetPostsByUserId(Resource):
  def get(self, id):
    posts = Post.query.filter(Post.user_id == id).order_by(Post.created.desc()).all()
    if not posts:
      return {'error': 'Posts not found'}, 404
    else:
      rb = [post.to_dict() for post in posts if post.event_id is None]
      return make_response(rb,200)

class GetPostsByEventId(Resource):
  def get(self, id):
    posts = Post.query.filter(Post.event_id == id).order_by(Post.created.desc()).all()
    if not posts:
      return {'error': 'Posts not found'}, 404
    else:
      rb = [post.to_dict() for post in posts]
      return make_response(rb, 200)

class DeletePost(Resource):
  def delete(self, id):
    post = Post.query.filter(Post.id == id).first()
    if post:
      try:
        db.session.delete(post)
        db.session.commit()
        return make_response({"message": "Account deleted successfully"}, 200)
      except Exception as e:
          db.session.rollback()
          print(e)
          return make_response({"error": f"Failed to delete post: {e}"}, 500)

class CommentByPostId(Resource):
  def get(self, id):
    
    comments = Comment.query.filter(Comment.post_id == id).order_by(Comment.created.desc()).all()
    if not comments:
      return {'error': 'Posts not found'}, 404
    else:
      rb = [comment.to_dict() for comment in comments]
      return make_response(rb,200)
  
  def post(self,id):
        data = request.get_json()
        print("Received comment data:", data)

        try:
            new_comment = Comment(
                user_id=session.get('user_id'),
                post_id=id,
                comment=data['comment'],
                upvotes=data.get('upvotes', 0)  # Default upvotes to 0 if not provided
            )
            db.session.add(new_comment)
            db.session.commit()

            response_data = new_comment.to_dict()
            print("New comment added:", response_data)
            return make_response(response_data, 201)  # Converts the dict to JSON
        except Exception as e:
            print("Error adding comment:", e)
            db.session.rollback()
            return make_response({'error': 'Error adding comment'}, 500)

api.add_resource(CommentByPostId, '/comments/<uuid:id>')
api.add_resource(DeletePost, '/post_delete/<uuid:id>')
api.add_resource(GetPostsByEventId, '/posts_by_event/<uuid:id>')
api.add_resource(GetPostsByUserId, '/posts_by_user/<uuid:id>')
api.add_resource(DeleteAccount, '/delete_account')    
api.add_resource(UpdatePassword, '/update_password')    
api.add_resource(DeleteMember, '/delete_member/<uuid:user_id>/<uuid:event_id>')
api.add_resource(SearchResource, '/search/<string:search_type>')
api.add_resource(MembersByEventId, '/members/<uuid:id>')    
api.add_resource(GetGroupsByUserId, '/eventsByUser/<uuid:id>')
api.add_resource(EventsById, '/events/<uuid:id>')
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