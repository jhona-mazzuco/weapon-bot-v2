import { HttpStatus, Injectable } from '@nestjs/common';
import { filter, map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Metacritic, MetacriticReview } from './models';

@Injectable()
export class MetacriticService {
  private readonly _API = 'https://backend.metacritic.com';
  private readonly _SITE = 'https://metacritic.com';
  private readonly _TOKEN = '1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u';

  constructor(private readonly _http: HttpService) {}

  getGameByFinder(slug: string): Observable<Metacritic> {
    return this._http
      .get<Metacritic>(
        `${this._API}/finder/metacritic/autosuggest/${slug.toString().toLowerCase()}`,
        {
          params: {
            apiKey: this._TOKEN,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  getScoreAndDetail(slug: string): Observable<MetacriticReview> {
    return this._http
      .get(`${this._API}/games/metacritic/${slug}/web`, {
        params: {
          apiKey: this._TOKEN,
        },
      })
      .pipe(
        filter((res) => res.status === HttpStatus.OK),
        map(({ data: res }) => res.data.item),
        map((res) => {
          const scoreIcon = res.criticScoreSummary.score ?? 'tbd';
          const review: MetacriticReview = {
            name: res.title,
            description: res.description,
            releaseDate: res.releaseDate,
            url: `${this._SITE}/game/${slug}`,
            score: `https://firebasestorage.googleapis.com/v0/b/score-metacritic.firebasestorage.app/o/metascore-${scoreIcon}.png?alt=media`,
            count: res.criticScoreSummary.reviewCount ?? '-',
            platform: res.platform,
            banner:
              `${this._SITE}/a/img/catalog` + res.images.at(0)?.bucketPath,
          };

          return review;
        }),
      );
  }
}
