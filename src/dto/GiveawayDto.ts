import { StringOption } from 'necord';
import { GiveawayTypes } from '../types/GiveawayTypes';

export class GiveawayDto {
  @StringOption({
    name: 'type',
    description: 'Insira o tipo do conteúdo',
    required: true,
    autocomplete: true,
  })
  type: GiveawayTypes;
}
