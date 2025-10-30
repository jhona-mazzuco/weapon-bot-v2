import { Controller, Logger, UseInterceptors } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { switchMap } from 'rxjs';
import { format } from 'date-fns';
import { MetacriticAutocompleteInterceptor } from './metacritic.interceptor';
import { MetacriticService } from './metacritic.service';
import { MetacriticDto } from './metacritic.dto';

@Controller('metacritic')
export class MetacriticCommands {
  private readonly logger = new Logger(MetacriticCommands.name);

  constructor(private readonly _service: MetacriticService) {}

  @UseInterceptors(MetacriticAutocompleteInterceptor)
  @SlashCommand({
    name: 'metacritic',
    description: 'Busca a nota de um jogo no Metacritic',
  })
  public async onMetacritic(
    @Context() [interaction]: SlashCommandContext,
    @Options() { slug }: MetacriticDto,
  ) {
    return interaction
      .deferReply()
      .then(() => {
        if (!slug?.length) {
          throw new Error('Missing required parameters');
        }
      })
      .then(() =>
        interaction.fetchReply().then(() => {
          return this._service.getScoreAndDetail(slug).pipe(
            switchMap((review) => {
              const releaseDate = new Date(review.releaseDate);
              let description = review.description;
              if (review.description.length > 500) {
                description = `${description.slice(0, 500)}...`;
              }

              return interaction.editReply({
                embeds: [
                  {
                    title: review.name,
                    description,
                    url: review.url,
                    image: { url: review.banner },
                    thumbnail: { url: review.score },
                    fields: [
                      {
                        name: 'Reviews',
                        value: `${review.count}`,
                        inline: true,
                      },
                      {
                        name: 'Platform',
                        value: review.platform,
                        inline: true,
                      },
                      {
                        name: 'Release On',
                        value: format(releaseDate, 'MMM dd, yyyy'),
                        inline: true,
                      },
                    ],
                  },
                ],
              });
            }),
          );
        }),
      )
      .catch((error) => {
        this.logger.error(error.message);
        return interaction.editReply({
          content: 'Ocorreu um erro ao tentar buscar a nota do jogo!',
        });
      });
  }
}
