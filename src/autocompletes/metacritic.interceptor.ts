import { Injectable } from '@nestjs/common';
import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
} from 'discord.js';
import { AutocompleteInterceptor } from 'necord';
import { Metacritic } from '../models/Metacritic';
import { firstValueFrom, switchMap } from 'rxjs';
import { MetacriticService } from '../services/metacritic/metacritic.service';

@Injectable()
export class MetacriticAutocompleteInterceptor extends AutocompleteInterceptor {
  constructor(private readonly _service: MetacriticService) {
    super();
  }

  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    const request = this._service.getGameByFinder(focused.value).pipe(
      switchMap((response: Metacritic) => {
        const choices = response.data.items.map(
          (item) =>
            ({
              name: item.title,
              value: item.slug,
            }) as ApplicationCommandOptionChoiceData<string>,
        );

        return interaction.respond(choices);
      }),
    );

    return firstValueFrom(request);
  }
}
