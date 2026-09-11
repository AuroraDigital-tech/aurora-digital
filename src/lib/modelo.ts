export type Modelo = "editorial" | "enterprise";

export function isModelo(value: unknown): value is Modelo {
  return value === "editorial" || value === "enterprise";
}
