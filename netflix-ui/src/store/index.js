import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";
const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async() => {
    const { data: { genres } } = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    // console.log('check genres', genres);
    return genres
});


const createArrayFromRawData = (array, moviesArray, genres) => {
    // console.log('check array of crreate array from raw: ',array)
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) {
                movieGenres.push(name.name);
            }
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3)
            })
        }
    });
}
const getRawData = async(api, genres, paging =false) => {
        const moviesArray = [];

        for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
            const { data: {results}, } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`
        
        );
            createArrayFromRawData(results,moviesArray,genres);
            // console.log('check log results: ',results);
            // console.log('check log movie array : ',results);

        };
    return moviesArray;
}

export const fetchMovies = createAsyncThunk(
    "netflix/trending", 
    async({type},thunkAPI) =>{
        const{
            netflix:{genres},
        } = thunkAPI.getState();
        return getRawData(
            `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            genres,
            true
        );
    // return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`);
    }

)
export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre", 
    async({genre,type},thunkAPI) =>{
        console.log("in fetch data", genre, type);
            const{
                netflix:{genres},
            } = thunkAPI.getState();
            const data =  getRawData(
                `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
                genres,
            );
            console.log('data:',data)
            return data;
    // return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`);
    }

)
export const getUserLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      
      return movies;
    }

);
export const removeFromLikedMovie = createAsyncThunk(
    "netflix/deleteLiked",
    async ({movieId,email}) => {
      const data = await axios.put(`http://localhost:5000/api/user/remove`,{
        email,movieId
      })
      return data;
    }
)
const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        
    });
    builder.addCase(removeFromLikedMovie.fulfilled, (state, action) => {
        state.movies = action.payload.data.movies;
        
    });
  },
});
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});