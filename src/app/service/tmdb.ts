import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OmdbService {
    private apiKey = '4fd879d7506f79d174d5c65e70744a4e';
    private apiUrl = 'https://api.themoviedb.org/3/search/person';

    constructor(private http: HttpClient) { }

    searchActors(name: string): Observable<any> {
        return this.http.get<any>(this.apiUrl, {
            params: {
                api_key: this.apiKey,
                query: name,
            },
        });
    }
}
