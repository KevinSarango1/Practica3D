'use client';
import './login.css';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { login } from '../hooks/Services_authenticate';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Sesion() {
    const router = useRouter();

    const validacion_esquema = Yup.object().shape({
        email: Yup.string().trim().required('Ingrese su correo').email('Correo inválido'),
        clave: Yup.string().trim().required('Ingrese su clave').min(8, 'La clave debe tener al menos 8 caracteres alfanuméricos')
    });

    const opciones_formulario = { resolver: yupResolver(validacion_esquema) };
    const { register, handleSubmit, formState } = useForm(opciones_formulario);
    const { errors } = formState;

    const enviar_data = (data) => {
        console.log("Datos enviados:", data);
        const info = { "usuario": data.email, "clave": data.clave };

        login(info)
            .then((respuesta) => {
                console.log("Respuesta del servidor:", respuesta);
                if (respuesta && respuesta.code === 200 && respuesta.datos) {
                    console.log("Inicio de sesión exitoso");
                    console.log(respuesta.datos);
                    Cookies.set('token', respuesta.datos.token);
                    Cookies.set('usuario', respuesta.datos.usuario);

                    swal({
                        title: "INFO",
                        text: "Bienvenido " + respuesta.datos.usuario,
                        icon: "success",
                        button: "Aceptar",
                        timer: 3000, // Duración del mensaje de bienvenida
                        closeOnEsc: true
                    });

                    // Redirigir al usuario al dashboard
                    router.push('/dashboard');

                    // Configurar tiempo de expiración del token
                    setTimeout(() => {
                        Cookies.remove('token');
                        Cookies.remove('usuario');
                        swal({
                            title: "Token Expirado",
                            text: "Vuelva a iniciar sesión.",
                            icon: "warning",
                            button: "Aceptar"
                        }).then(() => {
                            router.push('/sesion');
                        });
                    }, 1800000); // Expira en 3 segundos
                } else if (respuesta && respuesta.msg === "OK") {
                    swal({
                        title: "Error",
                        text: "Credenciales no válidas. Ingrese datos válidos.",
                        icon: "error",
                        button: "Aceptar",
                        timer: 3000, // Duración del mensaje de error
                        closeOnEsc: true
                    });
                    console.log("Inicio de sesión fallido");
                    console.log(respuesta);
                } else {
                    swal({
                        title: "Error",
                        text: "Respuesta inesperada del servidor",
                        icon: "error",
                        button: "Aceptar",
                        timer: 3000, // Duración del mensaje de error
                        closeOnEsc: true
                    });
                    console.log("Respuesta inesperada");
                    console.log(respuesta);
                }
            })
            .catch((error) => {
                swal({
                    title: "Error",
                    text: "Error al conectar con el servidor. Por favor, inténtalo de nuevo.",
                    icon: "error",
                    button: "Aceptar",
                    timer: 3000, // Duración del mensaje de error
                    closeOnEsc: true
                });
                console.error("Error en la solicitud:", error);
            });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/sesion');
        }
    }, [router]);

    return (
        <main className="form-signin">
            <form onSubmit={handleSubmit(enviar_data)}>
                <h1>Inicio de Sesión</h1>

                <div className="form-floating">
                    <input type="email" {...register('email')} className="form-control" placeholder="Ingrese su correo" />
                    <label htmlFor="floatingInput">Correo electrónico</label>
                    {errors.email && <div className="text-xs">{errors.email.message}</div>}
                </div>

                <div className="form-floating">
                    <input type="password" {...register('clave')} className="form-control" placeholder="Ingrese su clave" />
                    <label htmlFor="floatingPassword">Clave</label>
                    {errors.clave && <div className="text-xs">{errors.clave.message}</div>}
                </div>

                <button type="submit">Iniciar Sesión</button>
            </form>
        </main>
    );
}
