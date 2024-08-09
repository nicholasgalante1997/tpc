import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary('sd.config.json');
await sd.buildAllPlatforms();