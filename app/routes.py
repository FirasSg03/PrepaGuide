from flask import Blueprint, render_template, request

#define blueprint
bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/inputs')
def inputs():
    return render_template('inputs.html')

@bp.route('/detail', methods=["GET", "POST"])
def detail():
    # captures user data
    filiere = request.form.get('filiere')
    rank = request.form.get('rank')
    location = request.form.get('location')
    
    return render_template('detail.html')
