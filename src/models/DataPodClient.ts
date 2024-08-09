import { Session } from '@inrupt/solid-client-authn-browser';
import rdf from 'rdf-ext';
import { Parser } from 'n3';
import { Log, Timer, Option } from 'sleepydogs';

class DataPodClient {
  private static uri = process.env.SOLID_POD_URL;
  private logger = Log.factory({
    service: 'data-pod-client',
    version: '0.1',
    level: 'info'
  });
  constructor() {}

  async getResource(session: Session, path: string) {

    console.log('WEBID ID ' + session.info.webId);
    console.log('SESSION INFO', session.info);

    const callback = async () => {
      const response = await fetch(DataPodClient.uri + path, {
        headers: {
          Authorization: `Bearer ${session.info.webId}`
        }
      });
      const data = await response.text();

      console.log('rdf as string', data);
      const rdfAsJson = this.parseRDF(data);
      return rdfAsJson;
    };
    const $ = new Option(callback);
    const { data, state, error } = await $.resolve();
    if (state === 'rejected' || error || data == null) {
      this.logger.error(`[getResource()] has failed, and output the following error`);
      this.logger.error(`
            Error: ${error?.name || error}
            Message: ${error?.message};
            Stack: ${error?.stack}
        `);
      throw error || new Error('getResource');
    }
    return data;
  }

  private parseRDF(rdfString: string) {
    const parser = new Parser();
    const quads = parser.parse(rdfString);
    return quads.map((q) => ({
      ...(q.toJSON() as any)
    }));
  }
}

export default DataPodClient;
