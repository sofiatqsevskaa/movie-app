import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { OmdbService } from '../service/omdb-service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-search-movies',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    templateUrl: './search-movies.html',
    styleUrl: './search-movies.css',
})
export class SearchMovies implements OnInit {
    query$ = new Subject<string>();
    movies$: Observable<any[]> = of([]);
    loading = false;

    constructor(private omdbService: OmdbService) { }

    ngOnInit(): void {
        this.movies$ = this.query$.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(query => {
                if (!query.trim()) return of([]);
                this.loading = true;
                return this.omdbService.searchMovies(query).pipe(
                    switchMap(res => {
                        this.loading = false;
                        return of(res?.Search || []);
                    })
                );
            })
        );
    }

    searchMovies(term: string) {
        this.query$.next(term);
    }
}
