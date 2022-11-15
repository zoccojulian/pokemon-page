
export const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon'; 

export const onePokemon = async ( id ) => {

    const response = await fetch(`${URL_POKEMON}/${id}/`);

    // console.log('Status:', response.status);
    // console.log('OK:', response.ok)

    return response.json();
}

export const listaPokemon = async ( url ) => {

    const response = await fetch( url );

    return response.json();

}

export const allPokemon = async ( ) => {

    const response = await fetch(`${URL_POKEMON}?limit=100000&offset=0`);

    return response.json();
}