import { Injectable } from '@nestjs/common';
import { Giveaway } from '../../models/Giveaway';
import { GiveawayTypes } from '../../types/GiveawayTypes';

@Injectable()
export class FreeContentService {
  getGiveways(type: GiveawayTypes): Promise<Giveaway[]> {
    const url = new URL('https://gamerpower.com/api/giveaways');

    url.searchParams.set('type', type);
    url.searchParams.set('sort-by', 'popularity.date');

    return fetch(url, {
      method: 'GET',
    }).then((request) => request.json());
  }
}
