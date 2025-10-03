export interface User {
  username: string;
  discriminator: string;
  avatar: string;
  id: string;
}

export interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

export interface EmbedData {
  author: { name: string; url: string; icon_url: string; };
  title: string;
  url: string;
  description: string;
  color: string;
  fields: EmbedField[];
  thumbnail: { url: string; };
  image: { url: string; };
  footer: { text: string; icon_url: string; };
  timestamp: boolean;
}

export interface MessageData {
  username: string;
  avatar_url: string;
  content: string;
}