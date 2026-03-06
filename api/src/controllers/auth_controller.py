"""Auth controller to manage register, login and verify tokens from user"""
from flask import request, jsonify
from extensions import db, bcrypt
from src.models.user_model import User
from src.lib.jwt import generate_tokens

def register_user():
    """Register a new user"""
    data = request.get_json()

    name = data.get("name")
    username = data.get("username")
    password = data.get("password")

    if not name or not username or not password:
        return jsonify({
            "success": False,
            "message": "Hay datos faltantes"
        }),400

    user_found = User.query.filter_by(username=username).first()

    if user_found:
        return jsonify({
            "success": False,
            "message": "Usuario existente"
        }), 409
    hashed_password = bcrypt.generate_password_hash(password=password).decode("utf-8")

    new_user = User(
        username=username,
        password=hashed_password,
        name=name
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Usuario creado exitosamente"
    })

def login_user():
    """User login into his account"""
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Hay datos faltantes"
        }), 400

    user_found = User.query.filter_by(username=username).first()

    if not user_found:
        return jsonify({
            "success": False,
            "message": "El usuario no existe"
        }), 404

    hashed_password = bcrypt.check_password_hash(user_found.password, password)

    if not hashed_password:
        return jsonify({
            "success": False,
            "message": "La contraseña es incorrecta"
        }), 401
    return generate_tokens(user_found.id)
