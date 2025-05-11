import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/helpers";

const initialState = {
    favorites: loadFromLocalStorage("favorites") || [],
    lists: loadFromLocalStorage("lists") || { watchlater: [] },
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addFavorite(state, action) {
            if (!state.favorites.find((m) => m.id === action.payload.id)) {
                state.favorites.push(action.payload);
                saveToLocalStorage("favorites", state.favorites);
            }
        },
        removeFavorite(state, action) {
            state.favorites = state.favorites.filter((m) => m.id !== action.payload);
            saveToLocalStorage("favorites", state.favorites);
        },
    },
});

export const {
    addFavorite,
    removeFavorite,
    addToList,
    removeFromList,
    createList,
} = moviesSlice.actions;
export default moviesSlice.reducer;
