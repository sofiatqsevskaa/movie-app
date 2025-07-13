import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, JsonPipe } from '@angular/common';
import { OmdbService } from '../service/omdb-service';
import { Subject, Observable, of, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-search-movies',
    standalone: true,
    imports: [CommonModule, AsyncPipe, RouterModule],
    templateUrl: './search-movies.html',
    styleUrl: './search-movies.css',
})
export class SearchMovies implements OnInit {
    query$ = new Subject<string>();
    movies$: Observable<any[]> = of([]);

    constructor(private omdbService: OmdbService) { }


    ngOnInit(): void {
        this.movies$ = this.query$.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(query =>
                this.omdbService.searchMovies(query).pipe(
                    switchMap(res => {
                        const summaries = res?.Search || [];

                        if (!summaries.length) return of([]);

                        const detailRequests = summaries.map(movie =>
                            this.omdbService.getMovieDetails(movie.imdbID)
                        );

                        return forkJoin(detailRequests);
                    })
                )
            )
        );
    }

    searchMovies(term: string) {
        this.query$.next(term);
    }
}
