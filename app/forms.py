from flask import flash
from werkzeug.security import check_password_hash, generate_password_hash
from .models import User

def valid_sign_up(request):
    username = request.form['username']
    password = request.form['password']
    confirm_password = request.form['confirm_password']
    location = request.form['location']
    section = request.form['sections']
    rank = request.form['rank']
    
    user = User.query.filter_by(username=username).first()
    if user:
        flash("username already used")
    elif len(username)<3:
        flash("username must be greater than 3 characters")
    elif len(password)<5:
        flash("password must be at least 6 chars")
    elif password != confirm_password:
        flash("passwords dont match")
    else:
        new_user = User(
            username=username,
            password = generate_password_hash(password),
            location = location,
            section = section,
            rank = int(rank)
            )
        return new_user
    return False
        
def valid_login(request):
    username = request.form['username']
    password = request.form['password']
    
    user = User.query.filter_by(username=username).first()
    if user:
        if check_password_hash(user.password, password):
            return user
        else:
            flash('Incorrect password, try again.')
    else:
        flash('Username does not exist.')
    return False