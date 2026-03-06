"""Piece model"""
import uuid
import enum
from extensions import db


class PieceStatus(enum.Enum):
    """Piece status"""
    AVAILABLE = "avaliable"
    SOLD = "sold"


class Piece(db.Model):
    """Model"""

    __tablename__ = "pieces"

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text, nullable=True)
    photos = db.Column(db.JSON, default=list, nullable=False)
    status = db.Column(db.Enum(PieceStatus), default=PieceStatus.AVAILABLE, nullable=False)

    user_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"<Piece {self.name} - {self.status.value}>"
