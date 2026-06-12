// =============================================================================
//  CENNIK SCHODÓW STALOWYCH – PROJEKT-STAL
//  Edytuj te wartości gdy zmieniają się ceny materiałów lub robocizny.
// =============================================================================

// Cena bazowa za 1 m² „powierzchni schodów" (szerokość × wysokość kondygnacji).
// Przykład: schody 1,2 m szer. × 2,8 m wys. = 3,36 m² × 950 zł = ~3 190 zł (przed mnożnikiem kształtu).
// Gdy cena stali wzrośnie – zmień tę jedną liczbę.
export const BASE_PRICE_PER_M2 = 950; // PLN / m²

// Przedział wyceny: wynik × (1 - MARGIN) … wynik × (1 + MARGIN)
// Domyślnie ±15 %, czyli np. 3 190 zł ➜ od 2 711 do 3 669 zł.
export const ESTIMATE_MARGIN = 0.15;

// =============================================================================
//  KSZTAŁTY SCHODÓW – mnożniki ceny
//  1.0 = cena bazowa; każde 0.1 powyżej = +10% do wyceny.
//  Kształty bardziej złożone wymagają więcej materiału i robocizny.
// =============================================================================

export type StairShapeId =
  | "straight"       // Proste jednobiegowe
  | "l-landing"      // Jednobiegowe skręcające 90° ze spocznikiem
  | "l-winder"       // Zabiegowe skręcające 90°
  | "u-landing"      // Zawracające 180° ze spocznikiem
  | "u-two-landings" // Zawracające 180° z dwoma spocznikami w kształcie U
  | "u-winder";      // Zawracające 180° zabiegowe

export interface StairShape {
  id: StairShapeId;
  label: string;    // wyświetlana nazwa
  sublabel: string; // podpis pod ikoną
  // Mnożnik ceny względem ceny bazowej.
  // Proste = 1.0 (brak dopłaty).
  // Dodaj ~0.05–0.10 za każdy dodatkowy spocznik lub zabieg.
  multiplier: number;
}

export const STAIR_SHAPES: StairShape[] = [
  {
    id: "straight",
    label: "Proste jednobiegowe",
    sublabel: "Jeden prosty bieg",
    multiplier: 1.0, // najtańszy wariant – brak dopłaty
  },
  {
    id: "l-landing",
    label: "Skręcające 90° ze spocznikiem",
    sublabel: "Kształt L, spocznik na zakręcie",
    multiplier: 1.1, // +10%: dodatkowy spocznik poziomy
  },
  {
    id: "l-winder",
    label: "Zabiegowe skręcające 90°",
    sublabel: "Kształt L, stopnie klinowe",
    multiplier: 1.15, // +15%: skomplikowane stopnie klinowe na zakręcie
  },
  {
    id: "u-landing",
    label: "Zawracające 180° ze spocznikiem",
    sublabel: "Kształt U, jeden spocznik",
    multiplier: 1.2, // +20%: zawrót + spocznik
  },
  {
    id: "u-two-landings",
    label: "Zawracające 180° z dwoma spocznikami",
    sublabel: "Kształt U, dwa spoczniki",
    multiplier: 1.25, // +25%: dwa spoczniki, więcej stali
  },
  {
    id: "u-winder",
    label: "Zawracające 180° zabiegowe",
    sublabel: "Kształt U, stopnie klinowe",
    multiplier: 1.3, // +30%: najtrudniejszy wariant – zabieg na zawrocie
  },
];
