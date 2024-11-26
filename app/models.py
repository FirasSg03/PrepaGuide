from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    location = db.Column(db.String(150))
    section = db.Column(db.String(150))
    rank = db.Column(db.Integer)
    tables = db.relationship('Table')
    
    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "location": self.location,
            "section": self.section,
            "rank": self.rank
        }
    
class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Data(db.Model):
    __bind_key__ = 'data'
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(2))
    ecole = db.Column(db.String(150))
    filiere = db.Column(db.String(150))
    location = db.Column(db.String(150))
    category = db.Column(db.String(150))
    last_rank = db.Column(db.Integer)
    