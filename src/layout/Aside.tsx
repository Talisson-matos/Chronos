"use client";
import Link from "next/link";
import "../app/components.css";
import React, { useState, useEffect } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { AiFillCalculator } from "react-icons/ai";
import { TbClockHour3Filled } from "react-icons/tb";
import { SiConvertio } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

const Aside = () => {
    // Definir isMenuOpen com base no tamanho da tela no momento inicial
    const [isMenuOpen, setIsMenuOpen] = useState(
        typeof window !== "undefined" && window.innerWidth >= 640
    );
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth < 640
    );

    // Verificar mudanças no tamanho da tela
    useEffect(() => {
        const checkIfMobile = () => {
            const isSmallScreen = window.innerWidth < 640;
            setIsMobile(isSmallScreen);
            setIsMenuOpen(!isSmallScreen); // Menu aberto em desktop, fechado em mobile
        };

        checkIfMobile(); // Verificar tamanho inicial
        window.addEventListener("resize", checkIfMobile);

        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        if (isMobile) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <div className="menu_button" onClick={toggleMenu}>
                    <GiHamburgerMenu />
                </div>
            )}
            
            <aside className={`sidebar ${isMenuOpen || !isMobile ? "sidebar-open" : "sidebar-closed"}`}>
                <button className="sidebar-button">
                    <Link className="flex_aside" href="/" onClick={handleLinkClick}>
                        <TbClockHour3Filled /> Relógio
                    </Link>
                </button>
                
                <button className="sidebar-button">
                    <Link className="flex_aside" href="/countdown" onClick={handleLinkClick}>
                        <MdTimer /> Crônometro
                    </Link>
                </button>
                
                <button className="sidebar-button">
                    <Link className="flex_aside" href="/timer" onClick={handleLinkClick}>
                        <BsHourglassSplit /> Temporizador
                    </Link>
                </button>
                
                <button className="sidebar-button">
                    <Link className="flex_aside" href="/calculator" onClick={handleLinkClick}>
                        <AiFillCalculator /> Calculadora
                    </Link>
                </button>
                
                <button className="sidebar-button">
                    <Link className="flex_aside" href="/measureconverter" onClick={handleLinkClick}>
                        <SiConvertio /> Conversor de medidas
                    </Link>
                </button>
            </aside>
        </>
    );
};

export default Aside;