import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../service/omdb-service';
import { Movie } from '../model/movie';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.html',
    standalone: true,
    imports: [],
    styleUrls: ['./movie-details.css'],
})
export class MovieDetails implements OnInit {
    movie?: Movie;

    constructor(
        private route: ActivatedRoute,
        private omdbService: OmdbService
    ) { }

    ngOnInit(): void {
        const imdbID = this.route.snapshot.paramMap.get('imdbID');
        if (imdbID) {
            this.omdbService.getMovieDetails(imdbID).subscribe((data) => {
                this.movie = data;
            });
        }
    }
}
