"""Auth Routes"""

from flask import Blueprint
from src.controllers.auth_controller import register_user, login_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register",methods=["POST"])
def register():
    """Controller"""
    return register_user()

@auth_bp.route("/login", methods=["POST"])
def login():
    """Controller"""
    return login_user()
