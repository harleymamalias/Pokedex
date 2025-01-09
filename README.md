# PokeDex

## Overview

The PokeDex project is a simple application built with React, Vite, and styled-components. The goal of the project is to create a dynamic and interactive Pokémon list, allowing users to view detailed information about various Pokémon.

## Project Dependencies

- **React**: For building the UI.
- **Vite**: For fast development and bundling.
- **Styled-components**: For component-level styling.
- **TanStack Query**: For fetching and caching data from the PokeAPI.
- **Built-in React Hooks**: `useState`, `useContext`, and other hooks for state management.
- **Debounce Utility**: To optimize the search functionality and reduce the number of API calls during typing.

## Core Features

- **Pokemon Table**: Displays a list of Pokémon in a table format with columns for Pokémon ID, image, name, and type.
- **Pagination**: Users can navigate through the Pokémon list with "Next" and "Previous" buttons. The table initially displays the first 10 Pokémon.
- **Modal**: Clicking on a table row opens a modal that shows detailed Pokémon information, such as abilities, stats, and sprites.
- **Search Functionality**: Users can search for a Pokémon by name. The search results are filtered in real-time and only fetched if the search term is greater than 2 characters, with debounce applied to improve performance.
- **Styling**: The project utilizes styled-components to style the components and make the UI modern and responsive.

