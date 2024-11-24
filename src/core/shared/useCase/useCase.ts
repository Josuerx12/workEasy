export interface UseCase<input, output> {
  execute(input: input, any): Promise<output>;
}
