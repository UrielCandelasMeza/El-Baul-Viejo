"""JWT Utils"""
from flask import jsonify, make_response, request
from config import Config
from functools import wraps
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    verify_jwt_in_request,
    get_jwt_identity,
)


def generate_tokens(user_id):
    """Genera access y refresh token y los setea en cookies."""
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))

    response = make_response(jsonify({"message": "Autenticado"}), 200)

    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        secure=Config.JWT_COOKIE_SECURE,
        samesite=Config.JWT_COOKIE_SAMESITE
    )
    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=Config.JWT_COOKIE_SECURE,
        samesite=Config.JWT_COOKIE_SAMESITE
    )

    return response


def jwt_required_cookie(f):
    """Verifica access token, si expiró intenta renovarlo con el refresh token."""
    @wraps(f)
    def decorated(*args, **kwargs):
        # 1. Intentar con el access token
        try:
            verify_jwt_in_request()
            return f(*args, **kwargs)

        except Exception:
            # 2. Access token inválido o expirado, intentar con refresh token
            refresh_token = request.cookies.get("refresh_token")

            if not refresh_token:
                return jsonify({"error": "Sesión expirada, inicia sesión de nuevo"}), 401

            try:
                # 3. Verificar refresh token
                verify_jwt_in_request(refresh=True)
                user_id = get_jwt_identity()

                # 4. Generar nuevo access token
                new_access_token = create_access_token(identity=user_id)

                # 5. Ejecutar la función original y setear el nuevo token en la cookie
                response = make_response(f(*args, **kwargs))
                response.set_cookie(
                    "access_token",
                    new_access_token,
                    httponly=True,
                    secure=Config.JWT_COOKIE_SECURE,
                    samesite=Config.JWT_COOKIE_SAMESITE
                )
                return response

            except Exception:
                return jsonify({"error": "Sesión expirada, inicia sesión de nuevo"}), 401

    return decorated
