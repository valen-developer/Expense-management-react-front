// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockImplementation = (fn: any, implementation: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  fn.mockImplementation(implementation);
};
