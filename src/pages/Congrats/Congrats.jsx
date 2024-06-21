import React from 'react';

const Congrats = ({ message }) => {
  const containerStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: '1000', // Make sure it overlays other content
  };

  const textStyle = {
    fontSize: '2em',
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        {"¡FELICITACIONES! HAZ COMPLETADO EL JUEGO"} <br /><br />  
                    {"¡GRACIAS POR JUGAR!"}
      </div>
    </div>
  );
};

export default Congrats;
