import { Outcome } from "sleepydogs";
import Parser from './RDFParser';

export default class Resource {
    private static base = process.env.NODE_ENV === 'development' ? process.env.DEV_RESOURCE_API_URI :  process.env.RESOURCE_API_URI;
    private static query = "?iri=";
    
    private getResourceIRI(resource: string) {
        return Resource.base + Resource.query + encodeURIComponent(resource);
    }

    public async get(resource: string): Promise<Outcome<any[]>> {
        try {
            const parser = new Parser();
            const response = await fetch(this.getResourceIRI(resource));
            const text = await response.text();
            const triples = parser.parse(text);
            return {
                data: triples,
                state: 'resolved'
            }
        } catch (e) {
            return {
                data: null,
                state: 'rejected',
                error: e instanceof Error ? e : new Error(JSON.stringify(e))
            }
        }
    }

    public async getResourceList() {
        
    }
}