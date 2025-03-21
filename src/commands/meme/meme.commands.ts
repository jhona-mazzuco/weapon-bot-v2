import { Injectable, Logger } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { MemeService } from '../../services/meme/meme.service';
import { AUTHORS } from '../../utils/authors';

@Injectable()
export class MemeCommands {
  private readonly logger = new Logger(MemeCommands.name);

  constructor(private readonly service: MemeService) {}

  @SlashCommand({
    name: 'konservaroço',
    description: 'Solta uma frase do Kakaroço no dia menos conservador',
  })
  public async onKonservarocoMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const messages = [
        'Como guardião da Terra, é minha missão resistir às narrativas woke que ameaçam distorcer a verdade e dividir nossa sociedade.',
        'Na minha jornada em busca da força ilimitada, também busco fortalecer os valores tradicionais e rejeitar as agendas woke que minam a liberdade individual.',
        'Em minhas batalhas, não só luto pela vitória, mas pela preservação dos princípios anti-woke que valorizam a verdade e a liberdade de expressão.',
        'Acredito na liberdade individual e na responsabilidade pessoal, valores constantemente desafiados pelo pensamento woke que busca impor uma visão única de mundo.',
        'Como descendente dos Saiyajins, assumo a responsabilidade de resistir aos dogmas woke que tentam impor uma mentalidade de conformidade e divisão.',
        'Minha determinação é inabalável, pois sei que minha luta contra as agendas woke é fundamental para preservar a diversidade de pensamento e a liberdade de expressão.',
        'Enquanto treino para me tornar mais forte, também me preparo para enfrentar as narrativas woke que tentam distorcer a verdade e impor uma visão ideológica única.',
        'Na verdadeira batalha pela alma da humanidade, minha espada é a resistência ao pensamento woke que busca silenciar vozes dissidentes e impor uma mentalidade de conformidade.',
        'A morte não me assusta, mas a perspectiva de uma sociedade dominada pelo pensamento woke me motiva a lutar com ainda mais fervor.',
        'Cada batalha que travo é um golpe contra as tentativas de doutrinação woke que tentam impor uma visão ideológica estreita e minar a liberdade individual.',
        'Meus amigos e entes queridos podem contar comigo para protegê-los não apenas dos inimigos físicos, mas também das ideologias woke que tentam dividir e conquistar.',
        'A glória que busco não está na conquista pessoal, mas sim na derrota das narrativas woke que tentam distorcer a verdade e impor uma mentalidade de conformidade.',
        'Meu nome é sinônimo de resistência, uma barreira contra as tentativas de doutrinação woke que ameaçam a liberdade de pensamento e expressão.',
        'Cada vez que caio, levanto-me mais determinado a combater as forças que promovem uma mentalidade de conformidade e divisão através do pensamento woke.',
        'Minha jornada não é apenas de autodescoberta, mas também de confronto com as ameaças do pensamento woke que tenta cercear a diversidade de opiniões.',
        'Além da força física, cultivo a sabedoria necessária para desmascarar as narrativas woke que tentam impor uma visão ideológica única e limitar a liberdade de expressão.',
        'O caminho para a verdadeira liberdade passa pela rejeição do pensamento woke que busca impor uma mentalidade de conformidade e cercear a liberdade de expressão.',
        'Em tempos de adversidade, encontro força na minha determinação em proteger os valores que prezam pela diversidade de opiniões e pela liberdade individual.',
        'Minha jornada é uma constante luta contra as tentativas de doutrinação woke que buscam impor uma visão ideológica única e silenciar vozes dissidentes.',
        'A vitória final não será alcançada apenas derrotando os inimigos no campo de batalha, mas também desmascarando as mentiras do pensamento woke que ameaçam a liberdade e a verdade.',
      ];

      const { name, avatar } = AUTHORS.KONSERVAROCO;
      const embed = new EmbedBuilder()
        .setTitle(name)
        .setThumbnail(avatar)
        .setDescription(this.service.getRandomMessage(messages));
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error(e.message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'caishit',
    description: 'Solta a descrição de um caishit.',
  })
  public async onCaishitMessage(@Context() [interaction]: SlashCommandContext) {
    try {
      const message = `
        Um mendigo que surge em discussões sobre jogos com a força de mil argumentos reciclados. Insiste que o 'verdadeiro gamer' não precisa de exclusivos, apenas de 60fps (mesmo quando não tem). Vive convocando o poder do 'Game Pass Supremo', mas desvia o olhar ao ouvir as palavras 'Goty' 'Metacritic 90+' 'God of War' ou 'The Last of Us'. Reza diariamente para Phil Spencer enquanto grita na internet: 'pelo menos não preciso vender um rim pra comprar meus jogos!`;

      const { name, avatar } = AUTHORS.CAISHIT;
      const embed = new EmbedBuilder()
        .setTitle(name)
        .setThumbnail(avatar)
        .setDescription(message);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error(e.message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }
}
