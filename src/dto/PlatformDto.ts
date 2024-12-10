import { StringOption } from 'necord';

export class PlatformDto {
  @StringOption({
    name: 'platform',
    description: 'Escolha a plataforma do ranking',
    autocomplete: true,
    required: true,
  })
  platform: string;
}
