document.addEventListener('DOMContentLoaded', () => {

    const pokemonImage = document.querySelector('.pokemon-image');
    const pokemonIdEl = document.querySelector('.pokemon-id');
    const pokemonNameEl = document.querySelector('.pokemon-name');
    const pokemonTypesEl = document.querySelector('.pokemon-types');
    const pokemonStatsEl = document.querySelector('.pokemon-stats');
    const pokemonListEl = document.getElementById('pokemon-list');
    const loadMoreBtn = document.getElementById('load-more');
    const loadingMessage = document.querySelector('.loading-message');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const soundBtn = document.querySelector('.sound-btn');

    const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const MAX_POKEMON_ID = 1025;
    let offset = 0;
    const limit = 21;
    let currentPokemonId = 1;
    let currentCryUrl = null;


    const fetchPokemonList = async (offset, limit) => {
        try {
            const response = await fetch(`${POKE_API_BASE_URL}?offset=${offset}&limit=${limit}`);
            if (!response.ok) throw new Error('Não foi possível buscar a lista de Pokémon.');
            const data = await response.json();

            data.results.forEach(pokemon => {
                const id = pokemon.url.split('/').filter(Boolean).pop();
                createPokemonCard(id, pokemon.name);
            });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    /**
     * Cria um card de Pokémon na lista da direita.
     * @param {string} id - O ID do Pokémon.
     * @param {string} name - O nome do Pokémon.
     */
    const createPokemonCard = (id, name) => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.dataset.id = id;
        card.textContent = `#${id} ${name}`;
        pokemonListEl.appendChild(card);
    };


    const updateNavButtons = () => {
        prevBtn.disabled = currentPokemonId <= 1;
        nextBtn.disabled = currentPokemonId >= MAX_POKEMON_ID;
    };

    /**
     * Busca os dados completos de um Pokémon e os exibe na tela principal.
     * @param {string|number} idOrName - O ID ou nome do Pokémon a ser buscado.
     */
    const fetchAndDisplayPokemon = async (idOrName) => {

        loadingMessage.style.display = 'block';
        pokemonImage.style.display = 'none';
        soundBtn.classList.add('hidden');
        pokemonTypesEl.innerHTML = '';
        pokemonStatsEl.innerHTML = '';

        const currentActiveCard = document.querySelector('.pokemon-card.active');
        if (currentActiveCard) currentActiveCard.classList.remove('active');

        try {
            const response = await fetch(`${POKE_API_BASE_URL}/${idOrName}`);
            if (!response.ok) throw new Error('Pokémon não encontrado.');
            const data = await response.json();

            currentPokemonId = data.id;


            const newActiveCard = document.querySelector(`.pokemon-card[data-id='${currentPokemonId}']`);
            if (newActiveCard) newActiveCard.classList.add('active');


            pokemonIdEl.textContent = `#${data.id}`;
            pokemonNameEl.textContent = data.name;
            pokemonImage.src = data.sprites.front_default || '';
            pokemonImage.alt = data.name;


            if (data.cries && data.cries.latest) {
                currentCryUrl = data.cries.latest;
                soundBtn.classList.remove('hidden');
            } else {
                currentCryUrl = null;
                soundBtn.classList.add('hidden');
            }


            data.types.forEach(typeInfo => {
                const typeTag = document.createElement('span');
                typeTag.classList.add('type-tag', `type-${typeInfo.type.name}`);
                typeTag.textContent = typeInfo.type.name;
                pokemonTypesEl.appendChild(typeTag);
            });


            data.stats.forEach(statInfo => {
                const statRow = document.createElement('div');
                statRow.classList.add('stat-row');

                const statName = document.createElement('span');
                statName.classList.add('stat-name');
                statName.textContent = statInfo.stat.name.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def');

                const statBar = document.createElement('div');
                statBar.classList.add('stat-bar');

                const statBarInner = document.createElement('div');
                statBarInner.classList.add('stat-bar-inner');
                const statValue = Math.min(statInfo.base_stat, 255);
                statBarInner.style.width = `${(statValue / 255) * 100}%`;

                if (statValue < 70) statBarInner.classList.add('low');
                else if (statValue < 120) statBarInner.classList.add('medium');
                else statBarInner.classList.add('high');

                statBar.appendChild(statBarInner);
                statRow.appendChild(statName);
                statRow.appendChild(statBar);
                pokemonStatsEl.appendChild(statRow);
            });

            updateNavButtons();
            loadingMessage.style.display = 'none';
            pokemonImage.style.display = 'block';

        } catch (error) {
            console.error(error);
            alert(error.message);
            loadingMessage.textContent = 'Não encontrado!';
            pokemonIdEl.textContent = '';
            pokemonNameEl.textContent = '';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        }
    };

    pokemonListEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('pokemon-card')) {
            const id = event.target.dataset.id;
            fetchAndDisplayPokemon(id);
        }
    });


    loadMoreBtn.addEventListener('click', () => {
        offset += limit;
        fetchPokemonList(offset, limit);
    });


    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            fetchAndDisplayPokemon(searchTerm);
        }
        searchInput.value = '';
    });


    prevBtn.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            fetchAndDisplayPokemon(currentPokemonId - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPokemonId < MAX_POKEMON_ID) {
            fetchAndDisplayPokemon(currentPokemonId + 1);
        }
    });

    soundBtn.addEventListener('click', () => {
        if (currentCryUrl) {
            const cry = new Audio(currentCryUrl);
            cry.play();
        }
    });

    fetchPokemonList(offset, limit);
    fetchAndDisplayPokemon(1);
});