from flask import Blueprint, render_template, request, redirect, url_for

bp = Blueprint('main', __name__)

@bp.route('/')
def splash():
    return render_template('splash.html')

@bp.route('/main', methods=['POST'])
def main_page():
    rank = request.form.get('rank')
    location = request.form.get('location')
    # Process rank and location here to generate the list of links
    links = get_links_based_on_rank_and_location(rank, location)
    return render_template('main.html', links=links)

def get_links_based_on_rank_and_location(rank, location):
    # Placeholder function to simulate fetching links
    return ['link1', 'link2', 'link3']
