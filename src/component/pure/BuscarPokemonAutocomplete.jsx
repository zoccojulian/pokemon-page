import React, { useState , useRef , useEffect } from 'react';
import { allPokemon, onePokemon , URL_POKEMON} from '../../service/FetchService';
import Card from './Card';
import '../../scss/buscar.scss';

import imagenPikachu from '../../assets/imagen_error/pikachu_llorando.png';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import ListaConScroll from '../container/ListaConScroll';

const estadoInicial = {
        encontrado: false,
        textoError:'',
        nombre: '',
        coincidencias: [{name:'', url:''}]
}


export default function BuscarPokemonAutocomplete() {

    const [listaPokemon, setListaPokemon] = useState([])

    const [pokemon, setPokemon] = useState(estadoInicial);
    const [buscando, setBuscando] = useState(false);

    const [inputValue, setInputValue] = useState('')

    const obtenerId = ( url ) => {
        return url.replace('https://pokeapi.co/api/v2/pokemon/','')
        .replace('/','');
    }


    const obtenerListaPokemon = async () => {
        try {

            const lista = await allPokemon();
            let nuevaLista = []
            lista.results.map( ( pokemon ) => {
                nuevaLista.push({ label: `${obtenerId(pokemon.url)} - ${ pokemon.name }`,
                                    id: `${obtenerId(pokemon.url)}`, name: `${ pokemon.name }`,
                                    url: `${ pokemon.url }`
                                        })
            });

            setListaPokemon(nuevaLista)
            
        } catch (error) {
            console.log(error)
        }
    }


    const buscarPokemon = async ( id ) => {

        try {

            const pokemonPrueba = await onePokemon(id);
            const nombre = pokemonPrueba.name ;
            // const url = pokemonPrueba.sprites.other['official-artwork'].front_default;
            setPokemon(
                { 
                    encontrado: true, 
                    textoError:'' ,
                    nombre,
                    coincidencias:[ 
                        {
                            name: nombre,
                            url: `${URL_POKEMON}/${id}/`
                        }
                     ]
                }
            );
            setBuscando(false)
        } catch (error) {
            setPokemon(
                { 
                    encontrado:false, 
                    textoError:'No se econtró ningún pokemon',
                    nombre: '',
                    coincidencias:[]
                }
            );
            setBuscando(false);
        }
    }

    const buscarListaCoincidencias = ( lista , textoIngresado) => {

        setPokemon({ ...pokemon, coincidencias:[] })

        let newLista = [];
        lista.map( ( pokemon) => {
                newLista.push({ name: pokemon.name, url: pokemon.url })
        })

        setTimeout(() => {
            setPokemon(
                { 
                    encontrado: true, 
                    textoError:'' ,
                    nombre: textoIngresado,
                    coincidencias: newLista
                }
            );
    
            setBuscando(false);
        }, 1000);
    }



    useEffect(() => {
        obtenerListaPokemon();
    }, [])


    const submit = (e) => {
        e.preventDefault();
        setPokemon({encontrado: false, textoError:''});
        setBuscando(true);

        let idBuscar = listaPokemon.find( pokemon =>{ if( pokemon.label == inputValue ) return true })

        if( idBuscar !== undefined ){
            buscarPokemon(idBuscar.id);
        }else{
            let coincidencias = listaPokemon.filter(( pokemon ) => pokemon.label.includes(`${inputValue}`));

            if (coincidencias.length !==0  ){
                buscarListaCoincidencias(coincidencias, inputValue);
            }else{
                buscarPokemon(inputValue);
            }
        }

        
    }

    return (
        <div className='buscar'>
            <form onSubmit={ submit } className='buscar__form'>
                    <Autocomplete
                        className='buscar__form-input'
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={listaPokemon.map((pokemon) => pokemon.label)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Pokemon"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                <button  type='submit' className='buscar__form-buttom'>
                GO!
                </button>
            </form>
            { buscando && <span>BUSCANDO...</span>}
            { pokemon.textoError !== '' && 
                <div className='error__container'>
                    <span>{ pokemon.textoError }</span>
                    <img
                    src={ imagenPikachu }
                    ></img>
                </div>
             }
            { pokemon.encontrado  && 
                <ListaConScroll
                    lista={ pokemon.coincidencias }
                ></ListaConScroll>
            }
        </div>
    )
}







// import React, { useState , useRef , useEffect } from 'react';
// import { allPokemon, onePokemon } from '../../service/FetchService';
// import Card from './Card';
// import '../../scss/buscar.scss';

// import imagenPikachu from '../../assets/imagen_error/pikachu_llorando.png';

// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';

// const estadoInicial = {
//         encontrado: false,
//         textoError:'',
//         nombre: ''
// }


// export default function BuscarPokemonAutocomplete() {

//     const [listaPokemon, setListaPokemon] = useState([])

//     const [pokemon, setPokemon] = useState(estadoInicial);
//     const [buscando, setBuscando] = useState(false);

//     const [inputValue, setInputValue] = useState('')

//     const obtenerId = ( url ) => {
//         return url.replace('https://pokeapi.co/api/v2/pokemon/','')
//         .replace('/','');
//     }


//     const obtenerListaPokemon = async () => {
//         try {

//             const lista = await allPokemon();
//             let nuevaLista = []
//             lista.results.map( ( pokemon ) => {
//                 nuevaLista.push({ label: `${obtenerId(pokemon.url)} - ${ pokemon.name }`,
//                                     id: `${obtenerId(pokemon.url)}`, name: `${ pokemon.name }`,
//                                     url: `${ pokemon.url }`
//                                         })
//             });

//             setListaPokemon(nuevaLista)
            
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const buscarPokemon = async ( id ) => {

//         try {

//             const pokemonPrueba = await onePokemon(id);
//             const nombre = pokemonPrueba.name ;
//             // const url = pokemonPrueba.sprites.other['official-artwork'].front_default;
//             setPokemon({ encontrado: true, textoError:'' ,nombre});
//             setBuscando(false)
//         } catch (error) {
//             setPokemon({ encontrado:false, textoError:'No se econtró ningún pokemon',nombre: '' });
//             setBuscando(false);
//         }
//     }

//     useEffect(() => {
//         obtenerListaPokemon();
//     }, [])


//     const submit = (e) => {
//         e.preventDefault();
//         setPokemon({encontrado: false, textoError:''});
//         setBuscando(true);

//         let idBuscar = listaPokemon.find( pokemon =>{ if( pokemon.label == inputValue ) return true })
//         if( idBuscar !== undefined ){
//             buscarPokemon(idBuscar.id);
//         }else{
//             buscarPokemon(inputValue);
//         }

//         //TODO: Acá encuentra todos los que contienen ese texto.
//         //Aplicarlo cuando no sea una coincidencia exacta con la lista
//         //Chequear que no esté vacía.
//         //Cambiar para que se muetren todas la coincidencias . Usar un useState-lista y un .map
//         //OJO!! con el scroll, las card estas asociadas al scroll, hay que crear un escuchador
//         // y pasarlo por parámetro.
//         let newArray = listaPokemon.filter(( pokemon ) => pokemon.label.includes(`${inputValue}`))
//         console.log(newArray)
//     }

//     return (
//         <div className='buscar'>
//             <form onSubmit={ submit } className='buscar__form'>
//                     <Autocomplete
//                         className='buscar__form-input'
//                         inputValue={inputValue}
//                         onInputChange={(event, newInputValue) => {
//                             setInputValue(newInputValue);
//                         }}
//                         freeSolo
//                         id="free-solo-2-demo"
//                         disableClearable
//                         options={listaPokemon.map((pokemon) => pokemon.label)}
//                         renderInput={(params) => (
//                         <TextField
//                             {...params}
//                             label="Pokemon"
//                             InputProps={{
//                             ...params.InputProps,
//                             type: 'search',
//                             }}
//                         />
//                         )}
//                     />
//                 <button  type='submit' className='buscar__form-buttom'>
//                 GO!
//                 </button>
//             </form>
//             { buscando && <span>BUSCANDO...</span>}
//             { pokemon.textoError !== '' && 
//                 <div className='error__container'>
//                     <span>{ pokemon.textoError }</span>
//                     <img
//                     src={ imagenPikachu }
//                     ></img>
//                 </div>
//              }
//             { pokemon.encontrado  && 
//             <Card 
//                 scroll = {{
//                     windowInner: window.innerHeight, 
//                     documentElement: document.documentElement.clientHeight  
//                 }}
//              name= { pokemon.nombre }></Card>}
//         </div>
//     )
// }