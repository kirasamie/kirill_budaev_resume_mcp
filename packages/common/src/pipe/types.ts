/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fn<I = any, O = any> = (input: I) => O;

type ValidatePipe<Input, Fns extends readonly Fn[]> = Fns extends readonly []
  ? /** Если функций больше нет — завершаем рекурсию */
    []
  : /**
     * Разбираем кортеж функций:
     * A    — тип аргумента первой функции
     * B    — тип результата первой функции
     * Rest — оставшиеся функции цепочки
     */
    Fns extends readonly [(args: infer A) => infer B, ...infer Rest]
    ? /**
       * Валидация текущей функций относительно результата предыдущей
       */
      Input extends A
      ? /**
         * Результат текущей функции (`B`)
         * становится входом (`Input`) для следующего шага рекурсии.
         */
        [(arg: A) => B, ...ValidatePipe<B, Extract<Rest, readonly Fn[]>>]
      : never
    : never;

export type PipeResult<
  Input,
  Fns extends readonly Fn[],
> = Fns extends readonly []
  ? Input
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Fns extends readonly [Fn<infer A, infer B>, ...infer Rest]
    ? PipeResult<B, Extract<Rest, readonly Fn[]>>
    : never;

export type PipeArgs<V, Fns extends readonly Fn[]> =
  ValidatePipe<V, Fns> extends never ? never : Fns;
