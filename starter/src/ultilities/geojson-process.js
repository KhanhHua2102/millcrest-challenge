const fs = require('fs');
const path = require('path');

const inputFilePath = 'src/assets/vegetation-datawa.geojson';
const outputDir = 'src/assets/chunks/';
const featuresPerChunk = 1000;

let geoJsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
let features = geoJsonData.features;

let fileIndex = 0;
let currentChunk = {
  type: 'FeatureCollection',
  features: [],
};

for (let i = 0; i < features.length; i++) {
  currentChunk.features.push(features[i]);

  if (
    currentChunk.features.length >= featuresPerChunk ||
    i === features.length - 1
  ) {
    const outputFile = path.join(outputDir, `chunk_${fileIndex}.geojson`);
    fs.writeFileSync(outputFile, JSON.stringify(currentChunk, null, 2));
    console.log(`Chunk ${fileIndex} written to ${outputFile}`);

    fileIndex++;
    currentChunk.features = [];
  }
}

console.log('Splitting completed.');
