'use client';

import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menu() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const close = (e) => {
        Cookies.remove('token');
        Cookies.remove('usuario');
    }

    return (
        <div>
            <header>
                <div className="w-full h-20 navbar-dark bg-dark sticky top-0">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex justify-between items-center h-full">
                            <ul className="hidden md:flex gap-x-6 text-light font-bold">
                                <li>
                                    <Link href="/about">
                                        <p>About Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <p>Services</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contacts">
                                        <p>Contacts</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sesion" onClick={(e) => close(e)}>
                                        <p>Close</p>
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button className="btn btn-secondary" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        Panel Administrativo
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg">
                                            <li>
                                                <Link href="/producto">
                                                    <p className="px-4 py-2 hover:bg-gray-200">Administración de Productos</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/persona">
                                                    <p className="px-4 py-2 hover:bg-gray-200">Administración de Personas</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/persona/imagen">
                                                    <p className="px-4 py-2 hover:bg-gray-200">Guardado de Imágenes</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/galeria">
                                                    <p className="px-4 py-2 hover:bg-gray-200">Galería</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
