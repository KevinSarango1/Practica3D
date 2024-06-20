from flask import Blueprint, jsonify, make_response, request
from controllers.personaControl import PersonaControl
from controllers.utiles.errors import Errors
from flask_expects_json import expects_json
from controllers.authenticate import token_requerido

api_persona = Blueprint("api_persona", __name__)

personaC = PersonaControl()
# declaracion de esquema para validacion de datos Persona
schema_persona = {
    "type": "object",
    "properties": {
        "nombres": {"type": "string"},
        "apellidos": {"type": "string"},
        "identificacion": {
            "type": "string",
            "pattern": "^[0-9]+$",
            "message": "Solo se permiten numeros",
        },
        "usuario": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            "message": "El usuario debe ser un correo electronico valido",
        },
        "clave": {
            "type": "string",
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            "message": "La clave debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial",
        },
        "rol": {"type": "string"},
    },
    "required": ["nombres", "apellidos", "identificacion", "usuario", "clave","rol"],
}

schema_sesion = {
    "type": "object",
    "properties": {
        "usuario": {
            "type": "string",
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            "message": "El usuario debe ser un correo electronico valido",
        },
        "clave": {
            "type": "string",
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            "message": "La clave debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial",
        },
    },
    "required": ["usuario", "clave"],
}


# api para listar persona
@api_persona.route("/persona")

def listar():
    return make_response(
        jsonify(
            {
                "msg": "OK",
                "code": 200,
                "datos": ([i.serialize for i in personaC.listar()]),
            }
        ),
        200,
    )


# api para guardar persona
@api_persona.route("/persona/guardar", methods=["POST"])
#@token_requerido
@expects_json(schema_persona)
# guardar persona
def guardar():
    # data en json
    data = request.json
    id = personaC.guardar(data)

    if id >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Persona guardada"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(id)]}}
            ),
            400,
        )


# API para mostrar persona por external_id
@api_persona.route("/persona/<external_id>", methods=["GET"])
@token_requerido
def listar_external_id(external_id):
    persona = personaC.obtener_external_id(external_id)
    if persona:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": persona.serialize}), 200
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 404,
                    "data": {"error": "Persona no encontrado"},
                }
            ),
            404,
        )


# api para modificar persona
@api_persona.route("/persona/modificar/<external_id>", methods=["POST"])
@expects_json(schema_persona)
@token_requerido
def modificar(external_id):

    data = request.json
    persona = personaC.modificar(data, external_id)

    if persona:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Datos de persona modificados"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "datos": {"error": Errors.error[str(persona)]},
                }
            ),
            400,
        )

# api para modificar estado de cuenta de persona
@api_persona.route("/persona/estado-actualizar/<external>", methods=["POST"])
@token_requerido
def modificar_estado(external):

    persona = personaC.modificar_estado(external)

    if persona:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Estado de cuenta modificado"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "datos": {"error": Errors.error[str(persona)]},
                }
            ),
            400,
        )

# api_persona para inicar sesion
@api_persona.route("/sesion", methods=["POST"])
@expects_json(schema_sesion)
def iniciar_sesion():
    data = request.json
    persona = personaC.inicio_sesion(data)

    if isinstance(persona, int):
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "datos": {"error": Errors.error[str(persona)]},
                }
            ),
            400,
        )
    else:
        return make_response(
            jsonify(
                {"msg": "OK", "code": 200, "Mensaje": "Bienvenido :)","datos": persona}
            ),
            200,
        )
    
# API para listar imágenes
@api_persona.route("/persona/imagenes", methods=["GET"])
def listar_imagenes():
    imagenes = personaC.listar_imagenes()
    imagenes_list = [
        {
            'id': imagen.id,
            'persona_id': imagen.persona_id,
            'nombre_archivo': imagen.nombre_archivo,
            'estado': imagen.estado,
            'external_id': imagen.external_id,
            'tipo_archivo': imagen.tipo_archivo
        }
        for imagen in imagenes
    ]
    return jsonify(imagenes_list)

# API para guardar imagen
@api_persona.route("/persona/imagen", methods=["POST"])
def guardar_imagen():
    data = request.files.get('imagen')
    id = personaC.guardar_imagen(1, data)

    if id >= 0:
        return make_response(
            jsonify({
                "msg": "OK",
                "code": 200,
                "datos": {
                    "id": id,
                    "external_id": "some_external_id"  # Asegúrate de proporcionar el external_id si es necesario
                }
            }), 200
        )
    else:
        return make_response(
            jsonify({
                "msg": "ERROR",
                "code": 400,
                "datos": {
                    "error": Errors.error[str(id)]
                }
            }), 400
        )
