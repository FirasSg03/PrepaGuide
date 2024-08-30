from flask import Blueprint, redirect, render_template, request, url_for
from flask_login import login_required, current_user
from .models import User, Table
from .db import ball

bp = Blueprint('main', __name__)

@bp.route('/guide')
def guide():
    return render_template('/guide.html')

@bp.route('/learn_more')
def learn_more():
    return render_template('/learn_more.html')

@bp.route('/', methods=('GET', 'POST')) 
#@login_required
def index():
    #user = current_user.to_dict()
    user = {
                "id": 1, 
                "username": "user1",
                "location": "tunis",
                "filiere": "MP",
                "rank": 1100
                }

    return render_template('filter/index.html', user=user, ball=ball(user['rank']))
