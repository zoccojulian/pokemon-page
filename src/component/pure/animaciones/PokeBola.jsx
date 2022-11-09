import React , { useRef, useState }from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../assets/bodymovin/pokebola.json';

export default function PokeBola() {

    const animacion = useRef(null)
    const [estadoAnimacion, setEstadoAnimacion] = useState({isStopped: false, isPaused: false})

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rederer: 'svg'
    }


    return (
        <div className='item__pokebola'>
            <Lottie
                ref={ animacion }
                options={ defaultOptions }
                isStopped={ estadoAnimacion.isStopped }
                isPaused={ estadoAnimacion.isPaused }
            />
        </div>
            
    )
}
