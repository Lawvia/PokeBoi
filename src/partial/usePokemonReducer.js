import { useReducer } from 'react';
import store from 'store';
import { KEY_USER_DATA, RELEASE, ADD_POKEMON, ADD_POKEMONS } from './actions';

const releasePokemon = (releasedPokemon, state) => ({
  pokemons: getPokemonsList(state.pokemons, releasedPokemon),
});

const getPokemonsList = (pokemons, capturedPokemon) =>
  pokemons.filter(pokemon => pokemon !== capturedPokemon)

const addPokemon = (pokemon, state) => ({
  pokemons: [...state.pokemons, pokemon],
  capturedPokemons: state.capturedPokemons
});

const addPokemons = (pokemons, state) => ({
  pokemons: pokemons,
  capturedPokemons: state.capturedPokemons
});

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case RELEASE:
      var user = store.get(KEY_USER_DATA);
      user = user.filter(function(el){
        return el.nickname !== action.pokemon.nickname;
      });
      store.set(KEY_USER_DATA, user);
      return releasePokemon(action.pokemon, state);
    case ADD_POKEMON:
      var user = store.get(KEY_USER_DATA);
      if (!user){ //first time user
        var arr = [];
        arr.push(action.pokemon);
        store.set(KEY_USER_DATA, arr);
      }else{
        user.push(action.pokemon)
        store.set(KEY_USER_DATA, user);
      }
      return addPokemon(action.pokemon, state);
    case ADD_POKEMONS:
      return addPokemons(action.pokemons, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: []
  });
