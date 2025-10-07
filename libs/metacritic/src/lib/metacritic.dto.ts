import { StringOption } from 'necord';

export class MetacriticDto {
  @StringOption({
    name: 'game',
    description: 'Escolha um jogo para ver a nota',
    autocomplete: true,
    required: true,
  })
  slug: string;
}
