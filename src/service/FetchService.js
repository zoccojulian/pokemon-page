
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon' 

export const onePokemon = async ( id ) => {

    const response = await fetch(`${URL_POKEMON}/${id}`);

    console.log('Status:', response.status);
    console.log('OK:', response.ok)

    return response.json();
}

export const listaPokemon = async ( desde ) => {

    const response = await fetch(`${URL_POKEMON}?offset=${desde}&limit=20`);

    console.log('Status:', response.status);
    console.log('OK:', response.ok)

    return response.json();

}