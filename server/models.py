from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
import uuid
from sqlalchemy.dialects.postgresql import UUID, TEXT
class User(db.Model, SerializerMixin):
   __tablename__ = 'users'
  
   id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
   email = db.Column(db.String, nullable=False)
   following = db.Column(db.ARRAY(db.TEXT))
   followers = db.Column(db.ARRAY(db.TEXT))
   profile_pic = db.Column(db.String)
   display_name = db.Column(db.String, nullable=False)
   bio = db.Column(db.Text)
   catchphrase = db.Column(db.String)
   _password_hash = db.Column(db.String)

   # Relationship to Posts
   posts = db.relationship('Post', back_populates='user')
   # Relationship to Comments through the PostComments intermediary
   comments = db.relationship('Comment', back_populates='user')
   
   # Serialize Rules
   serialize_rules = ('-_password_hash','-posts.user', '-comments.user')
   
   @hybrid_property
   def password_hash(self):
      raise Exception('Password hashes may not be viewed')
   @password_hash.setter
   def password_hash(self, password):
      password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
      self._password_hash = password_hash.decode('utf-8')
   def authenticate(self, password):
      return bcrypt.check_password_hash(
      self._password_hash, password.encode('utf-8')
      )
   @validates('display_name')
   def validate_display_name(self, key, name):
      if not name or not isinstance(name, str):
         raise ValueError('display name must be non-empty string.')
      return name
   
# Post Model
class Post(db.Model):
   __tablename__ = 'posts'
    
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
   user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
   post_type = db.Column(db.Integer)
   media = db.Column(db.Text)
   caption = db.Column(db.String)
   likes = db.Column(db.ARRAY(db.TEXT))
   created = db.Column(db.DateTime, index=True, server_default=db.func.now())

   # Relationship to User
   user = db.relationship('User', back_populates='posts')
   # Relationship to PostComments
   comments = db.relationship('Comment', secondary='post_comments', back_populates='post')
   
   # Serialize Rules
   serialize_rules = ('-user.posts', '-comments.post')
   
   # Comment Model
class Comment(db.Model):
   __tablename__ = 'comments'
   
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
   comment = db.Column(db.Text)
   upvotes = db.Column(db.Integer)
   created = db.Column(db.DateTime, index=True, server_default=db.func.now())
   # Relationship to Users through the PostComments intermediary
   user = db.relationship('User', back_populates='comments')
   post = db.relationship('Post', secondary='post_comments', back_populates='comments')
   
   # Serialize Rules
   serialize_rules = ('-user.comments', '-post.comments')
   
   
# PostComments Model (association table)
class PostComment(db.Model):
   __tablename__ = 'post_comments'
    
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   post_id = db.Column(UUID(as_uuid=True), db.ForeignKey('posts.id'), nullable=False)
   comment_id = db.Column(UUID(as_uuid=True), db.ForeignKey('comments.id'), nullable=False)