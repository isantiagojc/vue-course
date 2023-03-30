import pokemonApi from '../api/pokemonApi';

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));
  return pokemonsArr.map((_, idx) => idx + 1);
};

const getPokemonOptions = async () => {
  const mixedPokemos = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonsNames(mixedPokemos.splice(0, 4));
  return pokemons;
};

const getPokemonsNames = async ([a, b, c, d] = []) => {
  //   const { data } = await pokemonApi.get(`/2`);
  //   console.log(data.name);
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const resp = await Promise.all(promiseArr);

  return resp.map((p) => ({ name: p.data.name, id: p.data.id }));
};

export default getPokemonOptions;
