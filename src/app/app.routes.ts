import { Routes } from '@angular/router';
import { MovieDetails } from './movie-details/movie-details';
import { SearchMovie } from './search-movies/search-movies';

export const routes: Routes = [{ path: '', component: SearchMovie },
{ path: 'movie/:imdbID', component: MovieDetails }
];

