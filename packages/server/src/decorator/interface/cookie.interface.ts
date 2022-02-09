export interface CookieInterface {
  get: () => string;
  set: (name: string) => void;
}
