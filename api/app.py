"""Main app from flask"""
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config
from extensions import bcrypt, jwt, db, migrate
from src.routes.auth_routes import auth_bp
#from routes.users import users_bp

load_dotenv()


def create_app():
    """Crea y configura la aplicación Flask."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    CORS(app,
         suports_credentials=True,
         origins=["http://localhost:5173"]
         )
    bcrypt.init_app(app)
    jwt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # Importante para las migraciones de sqlalchemy
    from src.models.user_model import User
    from src.models.piece_model import Piece

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    #app.register_blueprint(users_bp, url_prefix="/api/users")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(
        host=os.getenv("HOST"),
        port=3000,
        debug=os.getenv("DEBUG") == "True"
    )
