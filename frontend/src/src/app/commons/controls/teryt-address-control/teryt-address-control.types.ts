import { FormControl } from "@angular/forms";

export type DaneAdresoweFormType = {
  wojewodztwo: TerytWojewodztwoInterface;
  kodPocztowy: string;
  miejscowosc: TerytMiejscowoscInterface;
  ulica: TerytUlicaInterface;
  numerBudynku: string;
  numerLokalu: string | null;
};

export type DaneAdresoweFormValue = {
  wojewodztwo: FormControl<TerytWojewodztwoInterface | null>;
  kodPocztowy: FormControl<string | null>;
  miejscowosc: FormControl<TerytMiejscowoscInterface | null>;
  ulica: FormControl<TerytUlicaInterface | null>;
  numerBudynku: FormControl<string | null>;
  numerLokalu: FormControl<string | null>;
};

export interface TerytMiejscowoscInterface {
  symbolWojewodztwa: string;
  symbolPowiatu: string;
  symbolGminy: string;
  identyfikatorMiejscowosci: string;
  identyfikatorMiejscowosciGlownej: string;
  nazwaMiejscowosci: string;
  nazwaNaLiscie: string | null;
  posiadaUlice: boolean;
  nazwaGminy: string | null;
  rodzajJednostki: string;
}
export interface TerytUlicaInterface {
  identyfkatorMiejscowosci: string;
  identyfikatorNazwyUlicy: string;
  nazwa1: string;
  nazwa2: string;
  nazwaNaLiscie: string | null;
  cecha: string | null;
  cechaNazwa: string | null;
}
export interface TerytWojewodztwoInterface {
  terytId: string;
  nazwa: string;
  stanNa: string | null;
}
