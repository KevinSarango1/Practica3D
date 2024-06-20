from models.persona import Persona
from models.fotos import Fotos
from models.rol import Rol
from models.cuenta import Cuenta
from app import db
import uuid
from datetime import datetime, timedelta
import jwt
import hashlib
import os
from flask import current_app
from werkzeug.utils import secure_filename
EXTENSION= [".png",".jpg",".gif"]
TAMANIO= 1024*1024

class PersonaControl:
    # self es obligatorio
    def listar(self):
        # devuelve todas las filas de la tabla Persona
        return Persona.query.all()

    def guardar(self, data):
        rol = Rol.query.filter_by(nombre=data["rol"]).first()
        cuenta = Cuenta.query.filter_by( usuario=data["usuario"]).first()
        
        if rol:
            if not cuenta:
                persona = Persona()
                # izq bd, dere datos de vista
                persona.apellidos = data["apellidos"]
                persona.nombres = data["nombres"]
                persona.rol_id = rol.id
                persona.identificacion = data["identificacion"]
                persona.external_id = uuid.uuid4()
                db.session.add(persona)
                db.session.commit()

                c = Cuenta()
                c.usuario = data["usuario"]
                c.clave = hashlib.sha256(data["clave"].encode()).hexdigest()
                c.estado = True
                c.external_id = uuid.uuid4()
                c.persona_id = persona.id

                db.session.add(c)
                db.session.commit()

                return c.id
            else:
                return -6

        else:
            return -2
    def listar_imagenes(self):
        return Fotos.query.all()
        
    def guardar_imagen(self, persona_id, imagen):
        if imagen:
            # Obtener la extensión del archivo
            _, ext = os.path.splitext(imagen.filename)
            if ext.lower() in EXTENSION:
                tipo_archivo = 'imagen'  # Puedes ajustar según tus necesidades

                # Generar un nombre único para la imagen
                nombre_archivo = str(uuid.uuid4()) + ext

                # Guardar la imagen en la carpeta de archivos
                archivos_dir = os.path.join(current_app.root_path, 'Archivos')
                if not os.path.exists(archivos_dir):
                    os.makedirs(archivos_dir)

                # Guardar la imagen directamente en la carpeta
                imagen_path = os.path.join(archivos_dir, nombre_archivo)
                imagen.save(imagen_path)

                # Crear una entrada en la base de datos
                foto = Fotos(
                    persona_id=persona_id,
                    nombre_archivo=nombre_archivo,
                    estado=True,
                    external_id=str(uuid.uuid4()),
                    tipo_archivo=tipo_archivo  # Usa tipo_archivo aquí
                )

                db.session.add(foto)
                db.session.commit()

                return foto.id
            else:
                return -16
        else:
            return -15
# Metodo para obtener una persona por external id
    def obtener_external_id(self, external):
        return Persona.query.filter_by(external_id=external).first()

    # Metodo para modificar persona por external id
    def modificar(self, data, external):
 
        # siempre se busca por external
        rol = Rol.query.filter_by(nombre = data["rol"], estado = True).first()
        persona = Persona.query.filter_by(external_id=external,rol_id=rol.id).first()
        cuenta = Cuenta.query.filter_by(usuario=data["usuario"], estado = True, persona_id=persona.id).first()
        
        if rol:
            if cuenta:
                if persona:
                    persona.nombre = data["nombres"]
                    persona.apellido = data["apellidos"]
                    persona.identificacion = data["identificacion"]
                    persona.external_id = uuid.uuid4()
                    persona.rol_id = rol.id
                    db.session.merge(persona)
                    db.session.commit()

                    cuenta.usuario = data["usuario"]
                    cuenta.clave = hashlib.sha256(data["clave"].encode()).hexdigest()
                    cuenta.external_id = uuid.uuid4()
                    cuenta.persona_id = persona.id
                    db.session.merge(cuenta)
                    db.session.commit()

                    return cuenta.id
                else:
                    return -14
            else:
                return -8
        else:
            return -2

    # metodo para modificar estado de una cuenta de persona
    def modificar_estado(self, external):
        cuenta = Cuenta.query.filter_by(external_id=external).first()
        
        if cuenta:
            cuenta.estado = False

            # Guardar los cambios en la base de datos                
            db.session.merge(cuenta)
            db.session.commit()
            return cuenta.id
        else:
            return -4

    # inicio de sesion
    def inicio_sesion(self, data):
        # obtiene el primer correo que coincida en la bd
        cuentaA = Cuenta.query.filter_by(usuario=data["usuario"]).first()
        rol = Rol.query.filter_by(nombre="ADMINISTRADOR").first()
        
        if rol:
            if cuentaA:
                # encriptar clave
                clave = hashlib.sha256(data["clave"].encode()).hexdigest()
                # comparar clave
                if cuentaA.clave == clave:
                    if cuentaA.estado == True:
                        # creacion de token con un tiempo de duracion
                        token = jwt.encode(
                            {
                                "external": cuentaA.external_id,
                                # caduca en 2 horas
                                "expira": str(datetime.now().date() + timedelta(hours=2)),
                            },
                            key=current_app.config["SECRET_KEY"],
                            algorithm="HS512",
                        )
                        cuenta = Cuenta()
                        persona = cuenta.getPersona(cuentaA.persona_id)

                        info = {
                            "token": token,
                            "usuario": persona.apellidos + " " + persona.nombres,
                        }

                        return info
                    else:
                        return -9
                else:
                    return -8
            else:
                return -8
        else:
            return -7
