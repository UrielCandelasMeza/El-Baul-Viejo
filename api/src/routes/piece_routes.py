"""Routes for the piece"""

from flask import Blueprint

piece_bp = Blueprint("piece", __name__)

@piece_bp.route("/create", methods=["POST"])
def create():
    """Create"""
    return "Create"

@piece_bp.route("/update", methods=["PUT"])
def update():
    """Update"""
    return "Update"

@piece_bp.route("/delete", methods=["DELETE"])
def delete():
    """Delete"""
    return "Update"

@piece_bp.route("/get", methods=["GET"])
def get_all():
    """Get All"""
    return "Get"

@piece_bp.route("/get/<string:id>", methods=["GET"])
def get_one():
    """Get One"""
    return "Get one"
