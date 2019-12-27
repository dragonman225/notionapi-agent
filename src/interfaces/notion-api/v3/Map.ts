export type Map<T> = {
  /** 
   * `key` is an {@link UUID}.
   *
   * An example of `Map<T>` :
   * 
   * { "0297b381-6319-417b-a4f8-2ca1f2a96a81": *T* }
   */
  [key: string]: T
}