export interface ILanguageEnum {
  id?: number;
  languageName?: string;
  languageSymbol?: string;
}

export class LanguageEnum implements ILanguageEnum {
  constructor(public id?: number, public languageName?: string, public languageSymbol?: string) {}
}
