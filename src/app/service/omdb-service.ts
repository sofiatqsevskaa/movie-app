import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
    providedIn: 'root',
})
export class OmdbService {
    private apiKey = '53aab75b';
    private apiUrl = 'https://www.omdbapi.com/';

    constructor(private http: HttpClient) { }

    searchMovies(title: string): Observable<{ Search: Movie[]; totalResults: string; Response: string }> {
        console.log(`Searching for movies with title: ${title}`);
        return this.http.get<{ Search: Movie[]; totalResults: string; Response: string }>(this.apiUrl, {
            params: {
                apikey: this.apiKey,
                s: title,
            },
        });
    }

    getMovieDetails(imdbID: string): Observable<Movie> {
        return this.http.get<Movie>(this.apiUrl, {
            params: {
                apikey: this.apiKey,
                i: imdbID,
            },
        });
    }
}
