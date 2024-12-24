import { Parser } from 'n3';

export default class RDFParser {
  public parse(raw: string) {
    const parser = new Parser();
    const quads = parser.parse(raw);
    return quads.map((q) => ({
      ...(q.toJSON() as any)
    }));
  }
}
