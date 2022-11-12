
export const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon'; 

export const onePokemon = async ( id ) => {

    const response = await fetch(`${URL_POKEMON}/${id}/`);

    // console.log('Status:', response.status);
    // console.log('OK:', response.ok)

    return response.json();
}

export const listaPokemon = async ( url ) => {

    const response = await fetch( url );

    // console.log('Status:', response.status);
    // console.log('OK:', response.ok)

    return response.json();

}