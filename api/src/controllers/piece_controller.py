from flask import jsonfy, request
from extensions import db
from src.models.piece_model import Piece

def create_piece():
    data = request.get_json()

    name = data.get("name")
    price = data.get("price")
    decription = data.get("decription")
    photos = request.files.getlist("photos")
