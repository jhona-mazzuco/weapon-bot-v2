import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedBuilder } from 'discord.js';
import { HttpService } from '@nestjs/axios';
import { MostPlayedRankingService } from './most-played-ranking.service';
import { PlatformAutocompleteInterceptor } from './platform.interceptor';
import { PlatformDto } from './platform.dto';
import { Platform } from './models';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MostPlayedRankingCommands {
  private readonly logger = new Logger(MostPlayedRankingCommands.name);

  constructor(
    private _http: HttpService,
    private _service: MostPlayedRankingService,
  ) {}

  @UseInterceptors(PlatformAutocompleteInterceptor)
  @SlashCommand({
    name: 'most-played-games',
    description: 'Ranking dos jogos mais jogados na plataforma selecionada',
  })
  public async onMostPlayedGames(
    @Context() [interaction]: SlashCommandContext,
    @Options() { platform }: PlatformDto,
  ) {
    const config = {
      [Platform.Xbox]: {
        name: 'Xbox',
        color: 0x107c10,
        url: 'https://www.microsoft.com/en-us/store/most-played/games/xbox',
        logo: 'https://img.icons8.com/ios_filled/512/FFFFFF/xbox.png',
      },
      [Platform.Playstation]: {
        name: 'Playstation',
        color: 0x006fcd,
        url: 'https://ps-timetracker.com/statistic/last-24-hours',
        logo: 'https://img.icons8.com/ios11/512/FFFFFF/play-station.png',
      },
    }[platform];

    return interaction
      .deferReply()
      .then(() => interaction.fetchReply())
      .then(() =>
        firstValueFrom(this._http.get(config.url, { responseType: 'text' })),
      )
      .then((response) => response?.data)
      .then((template) => {
        if (Platform.Playstation === platform) {
          return this._service.getPlaystationRanking(template);
        }

        return this._service.getXboxRanking(template);
      })
      .then((ranking) => {
        const embed = new EmbedBuilder();

        embed.setTitle(`Mais jogados do ${config.name}`);
        embed.setThumbnail(config.logo);
        embed.setURL(config.url);
        embed.setColor(config.color);
        embed.setDescription(ranking.join('\n'));

        return interaction.editReply({ embeds: [embed] });
      })
      .catch((error) => {
        this.logger.error(error.message);
        return interaction.editReply({
          content: `Ocorreu um erro ao tentar buscar os jogos mais jogados do ${platform}!`,
        });
      });
  }
}
