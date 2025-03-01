export interface DateCreated {
  date?: any;
  timezone?: any;
}

export interface Images {
  id: string;
  filename: string;
  dateCreated: DateCreated;
  alt?: any;
  credits?: any;
  path?: any;
  cropGravity?: any;
  crop?: any;
  caption?: any;
  typeName: string;
  imageUrl?: any;
  width: number;
  height: number;
  sType?: any;
  bucketType: string;
  bucketPath: string;
  mediaType?: any;
  provider: string;
}

export interface Genres {
  id?: any;
  name: string;
}

export interface Platforms {
  id?: any;
  name: string;
}

export interface CriticScoreSummary {
  url: string;
  score: number;
}

export interface Game {
  id: number;
  type: string;
  typeId: number;
  title: string;
  slug: string;
  images: Images[];
  rating: string;
  releaseDate: string;
  premiereYear: number;
  genres: Genres[];
  description: string;
  duration?: any;
  mustSee: boolean;
  mustWatch: boolean;
  mustPlay: boolean;
  platforms: Platforms[];
  criticScoreSummary: CriticScoreSummary;
}

export interface Data {
  items: Game[];
  totalResults: number;
}

export interface Self {
  href: string;
}

export interface Links {
  self: Self;
}

export interface Meta {
  componentName?: any;
  componentDisplayName?: any;
  componentType?: any;
}

export interface Metacritic {
  data: Data;
  links: Links;
  meta: Meta;
}
