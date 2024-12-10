import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { EmbedBuilder } from 'discord.js';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { PlatformDto } from '../../dto/PlatformDto';
import { PlatformAutocompleteInterceptor } from '../../interceptors/platform.interceptor';
import { MostPlayedRanking } from '../../models/MostPlayedRanking';

@Injectable()
export class MostPlayedRankingCommands {
  private readonly logger = new Logger(MostPlayedRankingCommands.name);

  private async _createMostPlayedRanking(
    href: string,
  ): Promise<MostPlayedRanking> {
    const url = new URL(href);
    let source = url.origin;
    const responseCharts = await fetch(url.href);
    const htmlCharts = await responseCharts.text();
    const charts$ = cheerio.load(htmlCharts);
    const { rankingNewsHref } = charts$('div.news-section.list').extract({
      rankingNewsHref: {
        selector: 'article > a',
        value: 'href',
      },
    });
    source += rankingNewsHref;
    const responseNews = await fetch(source);
    const htmlNews = await responseNews.text();
    const news$ = cheerio.load(htmlNews);
    const ranking: string[] = [];
    const rows$ = news$('div.tab-w table tbody tr').slice(1);
    for (const row of rows$.get()) {
      const [position, name] = row.children;
      ranking.push(`${news$(position).text()} - ${news$(name).text()}`);
    }
    return { ranking, source };
  }

  @UseInterceptors(PlatformAutocompleteInterceptor)
  @SlashCommand({
    name: 'most-played-games',
    description: 'Ranking dos jogos mais jogados na plataforma selecionada',
  })
  public async onMostPlayedGames(
    @Context() [interaction]: SlashCommandContext,
    @Options() { platform }: PlatformDto,
  ) {
    const COMMAND_CONFIG = {
      Playstation: {
        chartUrl: 'https://www.truetrophies.com/playstation-chart',
        color: 0x006fcd,
      },
      Xbox: {
        chartUrl: 'https://www.trueachievements.com/xbox-chart',
        color: 0x107c10,
      },
    };

    return interaction
      .deferReply()
      .then(() =>
        this._createMostPlayedRanking(COMMAND_CONFIG[platform].chartUrl),
      )
      .then(({ ranking, source }) =>
        interaction.fetchReply().then(() => {
          const embed = new EmbedBuilder()
            .setColor(COMMAND_CONFIG[platform].color)
            .setTitle(`Jogos mais jogados no ${platform}`)
            .setURL(source)
            .setDescription(ranking.join('\n'));

          return interaction.editReply({ embeds: [embed] });
        }),
      )
      .catch((error) => {
        this.logger.error(error.message);
        return interaction.editReply({
          content: `Ocorreu um erro ao tentar buscar os jogos mais jogados do ${platform}!`,
        });
      });
  }
}
