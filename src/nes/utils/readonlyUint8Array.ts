export interface ReadonlyUint8Array
  extends Omit<Uint8Array, "copyWithin" | "fill" | "reverse" | "set" | "sort"> {
  readonly [n: number]: number;
}
