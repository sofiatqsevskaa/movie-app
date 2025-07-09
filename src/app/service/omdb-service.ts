import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OmdbService {
    private apiKey = '53aab75b';
    private apiUrl = 'https://www.omdbapi.com/';

    constructor(private http: HttpClient) { }

    searchMovies(title: string): Observable<any> {
        return this.http.get(this.apiUrl, {
            params: {
                apikey: this.apiKey,
                s: title,
            },
        });
    }

    getMovieDetails(imdbID: string): Observable<any> {
        return this.http.get(this.apiUrl, {
            params: {
                apikey: this.apiKey,
                i: imdbID,
            },
        });
    }
}
