from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
import uuid
from sqlalchemy.dialects.postgresql import UUID, TEXT
class User(db.Model, SerializerMixin):
   __tablename__ = 'users'
  
   id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   email = db.Column(db.String, nullable=False)
   following = db.Column(db.ARRAY(db.TEXT),nullable=True, default=[])
   followers = db.Column(db.ARRAY(db.TEXT),nullable=True, default=[])
   profile_pic = db.Column(db.TEXT)
   display_name = db.Column(db.TEXT, nullable=False, default='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACUCAMAAAA9M+IXAAAAMFBMVEXk5ueutLfr7O3n6eqrsbTc3+Cxt7rh4+TV2NqnrrHIzM7Lz9G4vcC/xMbDyMrO0tNHfP24AAAEMUlEQVR4nO2cW5LjIAwAbcTTBnP/2y5+JOvMOAkgLNha+mfy2aWSBQIxw9DpdDqdTqfT6XQ6nU4HATAGSuiAGMLP2jofARDeyXGHj9J5Ba0ag9DLaPh4hhs56aFBY6Zmy19dD2Nu5+aE2SSvXA/hcW4pi2HQl4H9i5HtpAQo91l2C/Gi2vBl+n0enH2taMJ3ipHdUljXVg0skbYBM9eOLyTYhgBX9k2zXX2r2sbm7ROj68UXdKptiG+1+gAqWXatZ9Xqr00PbvB1dWTTE/fwrZO+OamwU0OXZaXCFl5H7wvCZEdX0lcHsNm2YXdGbqvzbdfwUvsmrr6vmIk4G4T8LvUpvMS6GcvvS3hpswGyq9iBY6S+SFvipQJRdHdIGyGGqgsblLWB4erCSLwQA9Z23fbS6Qq0LuXChluBD126XS94vO5IqDvhbQl7itTThUtdT2Xbdf8BXcLcRduS6s4FdCnrLj4ZCOvuUGJVI2ze8w9wnljC9oehbbmlsx0Y4kzk0F0o97sz+lsjvaVA92ojaeeObickaeOOXYY58anTv3WKMyhUbeDUZ2S5FxOHLvXtMKCOICm79sPXIYJLfby7gribIA/uOn2T62voduYnVNSQyG847RLxIPdwhJPfoxy+WUtbtZEGGHLSgXKj+8M3Y2PGK1SFp29y01bTNpDaE1eezQKfkg+VRhnOJGwlTQNzeqAjrwQ5Za/+HlA2JiHMUvcrOzF/mYfdBiDrJ8IDUG78JMzl0sz47gow7d5GmI+uodDuwCCcuchhbswkmgrtAwbaSRnSlO/Zuv6VIbAtum4AG7RfnN1wbvF6aGlG/gIIwVQioNT2u3Hgldo6l+wR1X6eQiLIR96OISGWyesQ6qEZ8ZCc2q+aoQgcmqfFIWC4DNqzVlClRzsBDMRst2rwbVHjUtpFQ7Uvb00Ab7lJ2fAaIyehKlThsCrM7uf7qRg4D0EmHpBmEFLg67bmrfFoF0GWFQBiyVZ9KluaNgiUthk58Bsj59ubCwB//Yguh7CtVHfWNgCdn7HXTDeWCRHV5STBR3+PcPjAPnYM2cL2jr175CO6HN/Rla5qkd1urnDhqxXwd4X2IVzwJSawAmNu33yLvVwKiXBvaHffQtMucNs39oMiLzFB31K+rihw3VZi9jXeFztCUmQEKx6DG/HOeUyJ88XElzQTdhD5i7tVz/XNrw8U9fa3b2b9ZRH/xuAWsta3ArNieWQN8EGBtxG5vjmfW61UWEm/Ikq63isMt6kdJ1S0TZ8nKfDCC4VMi22972wnbbEo8dIAR9KkWY3V95WkVyC028ZL3YS1AvN+vRQJM6j42Wc8fImtvbjp0VJEz8zi36mWIHo6TrUQ3OiXxBVanitiXxKXeN5VgsiVAmpuHU/ETho1UHU34po20YhuZI8pJG+C2CM+1gitzBT8N/wBcX44zAWEsQEAAAAASUVORK5CYII=')
   bio = db.Column(db.Text)
   catchphrase = db.Column(db.TEXT, default='Hi 👋')
   _password_hash = db.Column(db.String)

   # Relationship to Posts
   posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
   
   comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
   owned_events = db.relationship('Event', back_populates='admin', cascade='all, delete-orphan')
   events = db.relationship('Event', secondary='members' ,back_populates='users')
   
   # Serialize Rules
   serialize_rules = (
        '-posts', '-comments', '-owned_events', '-events', 
        '-_password_hash'
   )
   
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
   
   @validates('catchphrase')
   def validate_cp(self, key, value):
      if len(value) > 47 :
         raise ValueError('catchphrase must be >=47 characters.')
      return value
# Post Model
class Post(db.Model, SerializerMixin):
   __tablename__ = 'posts'
    
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
   post_type = db.Column(db.Integer)
   media = db.Column(db.ARRAY(db.TEXT))
   caption = db.Column(db.TEXT)
   likes = db.Column(db.ARRAY(db.TEXT))
   created = db.Column(db.DateTime, index=True, server_default=db.func.now())
   event_id = db.Column(UUID(as_uuid=True), db.ForeignKey('events.id', ondelete='CASCADE'), nullable=True)
   
   user = db.relationship('User', back_populates='posts')
   
   comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
   events = db.relationship('Event', back_populates='posts')
   # Serialize Rules
   serialize_rules = ('-user.posts', '-comments.post','-events.posts','-comments.user')
   
   # Comment Model
class Comment(db.Model, SerializerMixin):
   __tablename__ = 'comments'
   
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
   post_id = db.Column(UUID(as_uuid=True), db.ForeignKey('posts.id', ondelete='CASCADE'), nullable=False)
   comment = db.Column(db.Text)
   upvotes = db.Column(db.Integer)
   created = db.Column(db.DateTime, server_default=db.func.now())
   
   user = db.relationship('User', back_populates='comments')
   post = db.relationship('Post', back_populates='comments')
   
   # Serialize Rules
   serialize_rules = ('-user.comments', '-post.comments')

   
class Event(db.Model, SerializerMixin):
   __tablename__ = 'events'
   
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   admin_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
   created = db.Column(db.DateTime, server_default=db.func.now())
   eventTime= db.Column(db.DateTime, nullable=False)
   profile_pic = db.Column(db.Text, nullable=False)
   location = db.Column(db.Text, nullable=False)
   display_name = db.Column(db.Text, nullable=False)
   description = db.Column(db.Text, default = '🤷')
   
   admin = db.relationship('User', back_populates='owned_events')
   users = db.relationship('User', secondary='members', back_populates='events')
   posts = db.relationship('Post', back_populates='events')

   serialize_rules = (
        '-users', '-posts', '-admin.owned_events', '-admin.events'
    )
class Members(db.Model, SerializerMixin):
   __tablename__ = 'members'
   
   id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
   user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, )
   event_id = db.Column(UUID(as_uuid=True), db.ForeignKey('events.id', ondelete='CASCADE'), nullable=False, )
   