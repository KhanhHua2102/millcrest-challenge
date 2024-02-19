const fs = require('fs');
const readline = require('readline');

// Define the input and output file paths
const inputFile = 'src/assets/vegetation-datawa.geojson';
const outputFile = 'src/assets/vegetation-datawa1.geojson';

// Create a read stream for the input file
const readStream = fs.createReadStream(inputFile);

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFile);

// Create an interface to read the input file line by line
const rl = readline.createInterface({
  input: readStream,
  output: writeStream, // Write to output file
});

// Event listener for reading lines
rl.on('line', (line) => {
  // Parse the JSON object from the line
  const features = JSON.parse(line);

  delete features.name;

  // Convert the modified feature back to JSON string
  const modifiedLine = JSON.stringify(feature);

  // Write the modified line to the output file
  writeStream.write(modifiedLine + '\n');
});

// Event listener for when all lines have been read
rl.on('close', () => {
  console.log('Properties removed successfully!');
});
