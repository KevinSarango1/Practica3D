from app import db
from datetime import datetime


class Fotos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    persona_id =  db.Column(db.Integer, db.ForeignKey("persona.id"))
    nombre_archivo = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Boolean, default=True)
    external_id = db.Column(db.String(60), unique=True, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.now)
    fecha_actualizacion = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    tipo_archivo = db.Column(db.Enum('imagen', 'documento', 'otro'), nullable=False)
    # Puedes añadir más campos según tus necesidades, como tamaño, descripción, etc.

    @property
    def serialize(self):
        return {
            "nombre_archivo": self.nombre_archivo,
            "estado": self.estado,
            "external_id": self.external_id,
            "fecha_creacion": self.fecha_creacion.isoformat(),
            "fecha_actualizacion": self.fecha_actualizacion.isoformat(),
            "tipo_archivo": self.tipo_archivo,
            # Agrega más campos si es necesario
        }
