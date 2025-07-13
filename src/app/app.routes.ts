import { Routes } from '@angular/router';
import { MovieDetails } from './movie-details/movie-details';
import { SearchMovies } from './search-movies/search-movies';

export const routes: Routes = [
    { path: '', component: SearchMovies },
    { path: 'details/:imdbID', component: MovieDetails },
];

