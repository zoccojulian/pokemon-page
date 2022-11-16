import React from 'react';
import '../../scss/sinFoto.scss';
import sinFoto from '../../assets/imagen_error/pikachu_silueta_sinImagen.png';

export default function SinFoto() {
    return (
        <div className='item_sinFoto'>
            <img 
            className='item_sinFoto-imagen'
            src= { sinFoto } ></img>
            <span className='item_sinFoto-texto'>SIN FOTO</span>
        </div>
    )
}
