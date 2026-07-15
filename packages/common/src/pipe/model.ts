import type { Fn, PipeArgs, PipeResult } from './types';

export const pipe = <Value, Fns extends readonly Fn[]>(
  value: Value,
  ...fns: PipeArgs<Value, Fns>
): PipeResult<Value, Fns> => {
  let result = value;

  /** Ввиду активного использования дженериков - двойное присваивание as в цикле и результате */
  for (const fn of fns as readonly Fn[]) {
    result = fn(result);
  }

  return result as PipeResult<Value, Fns>;
};
