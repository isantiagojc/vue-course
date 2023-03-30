<template>
    <div>
        <h1 v-if="!pokemon">Cargando...</h1>

        <div v-else>
            <h1>¿Quien es ese pokemon?</h1>

            <PokemonPicture :pokemon-id='pokemon.id' :show-pokemon='showPokemon' />
            <PokemonOptions :pokemons='pokemonArr' @selection='checkAnswer' />

            <template v-if="showAnswer">
                <h2>{{ message }}</h2>
                <button @click='newGame'>Nuevo Juego</button>
            </template>
        </div>
    </div>
</template>
<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
    components: {
        PokemonOptions,
        PokemonPicture
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)

            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true

            if (selectedId === this.pokemon.id)
                this.message = `Correcto, es ${this.pokemon.name}`
            else this.message = `Oops, era ${this.pokemon.name}`

        },
        newGame() {
            this.pokemon = null
            this.message = ''
            this.showAnswer = false
            this.showPokemon = false
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>
<style ></style>