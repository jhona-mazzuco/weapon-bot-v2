import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class MostPlayedRankingService {
  async getPlaystationRanking(template: string): Promise<string[]> {
    return this._getRanking(
      template,
      'div.table-responsive table tbody tr td a',
    );
  }

  getXboxRanking(template: string): string[] {
    return this._getRanking(
      template,
      'section ul.list-unstyled li div.material-card div.card-body a',
    );
  }

  private _getRanking(template: string, selector: string): string[] {
    const $ = cheerio.load(template);

    const { games } = $.extract({
      games: [
        {
          selector,
          value: 'textContent',
        },
      ],
    });

    return games.slice(0, 40).map((game, index) => `${index + 1} - ${game}`);
  }
}
