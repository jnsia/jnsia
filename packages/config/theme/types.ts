export type ThemeSection = Record<string, string | Record<string, any>>;

export interface ThemeTokens {
  seed: string;
  foundation: ThemeSection;
  button: ThemeSection;
  text: ThemeSection;
  border: ThemeSection;
  semantic: ThemeSection;
  background: ThemeSection;
  titlebar: ThemeSection;
  loader: ThemeSection;
}
