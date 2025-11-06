import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Meme } from './models';
import { APIEmbed } from 'discord.js';
import {
  baseContext,
  caishitContext,
  konservarocoContext,
  metendistaContext,
  sonhystaContext,
  valvecuckContext,
  wokenaroContext,
} from './contexts';

@Injectable()
export class MemeService {
  private readonly _openai: OpenAI = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  private _getMessage(context: string) {
    const input = baseContext + context;
    return this._openai.responses
      .create({
        model: 'gpt-4.1-mini',
        input,
      })
      .then((res) => res.output_text);
  }

  buildEmbed({ author, avatar, message }: Meme) {
    return {
      title: author,
      description: message,
      thumbnail: {
        url: `https://bucket.refugiogamer.com/2/${avatar}.webp`,
      },
    };
  }

  async getKonservarocoMeme(): Promise<Meme> {
    const message = await this._getMessage(konservarocoContext);
    return {
      author: 'Konservaroço Goku',
      avatar: 'OIG_3_J_96d6f530aa',
      message,
    };
  }

  async getCaishitMeme(): Promise<Meme> {
    const message = await this._getMessage(caishitContext);
    return {
      author: 'Caishit',
      avatar: 'Gd_B_Sf0_AXMA_Amw_IX_c5435bb417',
      message,
    };
  }

  async getSonhystaMeme(): Promise<Meme> {
    const message = await this._getMessage(sonhystaContext);
    return {
      author: 'Sonhysta',
      avatar: 'sonhysta_78f3bd0b84',
      message,
    };
  }

  async getMetendoMeme(): Promise<Meme> {
    const message = await this._getMessage(metendistaContext);
    return {
      author: 'Metendista',
      avatar: 'metendo_png_fe297648c3',
      message,
    };
  }

  async getValvecuckMeme(): Promise<Meme> {
    const message = await this._getMessage(valvecuckContext);
    return {
      author: 'Valvecuck',
      avatar: 'images_0933690d6e',
      message,
    };
  }

  async getWokenaroMeme(): Promise<Meme> {
    const message = await this._getMessage(wokenaroContext);
    return {
      author: 'The Wokenaro',
      avatar: 'b7b302ef8c7744ef854f898dcceb9330_200efaad4e',
      message,
    };
  }
}
