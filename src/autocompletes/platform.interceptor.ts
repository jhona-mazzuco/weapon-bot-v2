import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';
import { Platform } from '../models/Platform';

@Injectable()
export class PlatformAutocompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    const choices: { name: keyof typeof Platform; value: Platform }[] = [];

    if (focused.name === 'platform') {
      for (const key of Object.keys(Platform)) {
        choices.push({
          name: key as keyof typeof Platform,
          value: Platform[key],
        });
      }
    }

    return interaction.respond(
      choices.filter((choice) =>
        choice.name
          .toLowerCase()
          .startsWith(focused.value.toString().toLowerCase()),
      ),
    );
  }
}
