
# 🔴 Pokédex Interativa

Uma Pokédex clássica e funcional construída com **HTML5, CSS3 e JavaScript puro**, consumindo dados em tempo real da **PokéAPI** 💻✨

Projeto ideal para praticar o consumo de APIs REST, manipulação assíncrona de dados (`async/await`) e criação de interfaces dinâmicas e ricas em detalhes no front-end.

-----

## ✨ Funcionalidades

  - **Conexão com API Externa:** Busca e exibe todos os dados em tempo real da [PokéAPI](https://pokeapi.co/).
  - **Listagem Dinâmica:** Carrega uma lista inicial de Pokémon e permite carregar mais com um botão "Carregar Mais".
  - **Visualização Detalhada:** Ao clicar, exibe informações completas do Pokémon, incluindo:
      - Imagem (Sprite)
      - Nome e Número da Pokédex
      - **Tipos** com tags coloridas correspondentes
      - **Status Base** (HP, Ataque, Defesa, etc.) com barras de progresso visuais
  - **Busca Inteligente:** Um campo de busca que consulta diretamente a API, permitindo encontrar qualquer Pokémon por **nome** ou **ID**.
  - **Navegação Completa:** Botões de "Anterior" e "Próximo" para navegar sequencialmente entre os Pokémon.
  - **Sons (Cry):** Botão para tocar o som característico de cada Pokémon.
  - **Interface Atraente:** Design inspirado na Pokédex clássica com um fundo de gradiente animado feito puramente em CSS.

-----

## 🛠️ Tecnologias Utilizadas

  - **HTML5**: Para a estrutura semântica da página.
  - **CSS3**: Para toda a estilização e design, utilizando:
      - **Flexbox** e **Grid Layout** para a organização dos painéis.
      - **Animações (`@keyframes`)** para o fundo dinâmico.
      - **Transformações 2D** para efeitos de hover e layout.
  - **JavaScript (Vanilla - ES6+)**: Responsável por toda a lógica e interatividade:
      - **`async`/`await`** para lidar com as requisições assíncronas de forma limpa.
      - **`fetch()` API** para consumir os dados da PokéAPI.
      - **Manipulação do DOM** para criar e atualizar a interface dinamicamente.
      - **Objeto `Audio`** para a funcionalidade de som.
  - **PokéAPI**: A API REST gratuita e completa que fornece todos os dados sobre o universo Pokémon.

-----

## 🚀 Como executar localmente

Este projeto não possui dependências ou pacotes para instalar. Basta clonar e abrir o arquivo principal.

```bash
# 1. Clone este repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 2. Acesse a pasta do projeto
cd nome-do-repositorio

# 3. Abra o arquivo index.html no seu navegador de preferência
```

E está pronto para usar\!

-----

## 📂 Estrutura do Projeto

A estrutura de arquivos é simples e focada na separação de responsabilidades do front-end.

```
pokedex/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── pokebola.png
└── README.md
```
