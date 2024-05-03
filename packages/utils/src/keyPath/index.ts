/**
 * Generates a union type of dot-notation paths for each property within a nested object type `T`.
 * This type recursively traverses all properties of the object, concatenating keys to form paths.
 * It is useful for type-safe access to nested properties, especially in contexts where string paths
 * are used to reference properties dynamically (like in certain locale or API mappings).
 *
 * @template T - The object type from which to generate property paths.
 * @template Prefix - Accumulates the property path as recursion unfolds, defaults to an empty string.
 * This is primarily used internally by the type during the recursion and should not typically be set manually.
 *
 * @returns A union type of string literals representing each path in the object.
 * Each string is a path leading to a property in the object, constructed from the root to that property,
 * with property names concatenated by dots. For properties that are objects themselves, the type
 * recursively includes paths for their nested properties as well.
 *
 * Example Usage:
 * ```
 * interface Example {
 *   a: {
 *     b: {
 *       c: number;
 *       d: string;
 *     };
 *     e: string;
 *   };
 *   f: boolean;
 * }
 *
 * type ExamplePaths = Path<Example>;
 * // Type 'ExamplePaths' would be "a.b.c" | "a.b.d" | "a.e" | "f"
 * ```
 */
export type KeyPath<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${Prefix}${K}` | KeyPath<T[K], `${Prefix}${K}.`>
        : never
    }[keyof T]
  : never
