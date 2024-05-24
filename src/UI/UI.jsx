import React from 'react';
import heartIcon from "../icons/HealthMeter.png" // Importa la imagen del icono de corazón
import flowerIcon from "../icons/Flower.png"

import './GameUI.css'; // Asegúrate de crear un archivo CSS para el estilo de la interfaz de usuario
import { useGameContext } from '../context/GameContext';


const GameUI = () => {
    const { puntaje, health } = useGameContext();

    // Generar dinámicamente elementos de imagen de corazón basados en la cantidad de salud
    const renderHeartIcons = () => {
        console.log("entrar renderizar corazones")
        console.log("health", health)
        const hearts = [];
        for (let i = 0; i < health; i++) {
            hearts.push(<img key={i} src={heartIcon} alt="Corazón" />);
        }
        return hearts;
    };

    return (
        <div className="game-ui" style={{ fontSize: '36px' }}>
            <div className="lives">
                <div className="heart-icons">{renderHeartIcons()}</div>
            </div>
            <div className="score">
                <h2><img src={flowerIcon} alt="Icono de flor" height={75} width={200} />
                    {puntaje}
                </h2>
            </div>

        </div>
    );
};

export default GameUI;
