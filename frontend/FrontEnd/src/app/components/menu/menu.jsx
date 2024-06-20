'use-client';
import { Button } from "bootstrap";
import Cookies from "js-cookie";
import Link from "next/link";

export default function menu() {
    const close = (e) => {
        Cookies.remove('token');
        Cookies.remove('user');
    }
    return (
        <div>
            <headers>
                <div className="w-full h-20 navbar navbar-dark bg-dark sticky top-0">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex justify-between items-center h-full">

                            <ul className="hidden md:flex gap-x-6 text-white">
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

                            </ul>
                        </div>
                    </div>
                </div>
            </headers>
        </div>
    )
}