import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';

@Injectable()
export class PlatformAutocompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    let choices: string[];

    if (focused.name === 'platform') {
      choices = ['Playstation', 'Xbox'];
    }

    return interaction.respond(
      choices
        .filter((choice) =>
          choice
            .toLowerCase()
            .startsWith(focused.value.toString().toLowerCase()),
        )
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
