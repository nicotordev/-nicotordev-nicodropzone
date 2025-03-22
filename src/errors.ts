class NicoDropzoneError extends Error {
  public data: unknown;
  constructor(message: string, data?: unknown) {
    super(message);
    this.name = 'NicoDropzoneError';
    this.data = data;
  }
}

export { NicoDropzoneError };
