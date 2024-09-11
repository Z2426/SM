import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read and parse JSON files
const readJSONFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Error reading or parsing file ${filePath}:`, error);
        return {};  // Return an empty object on error
    }
};

// Read and combine all files in the 'paths' directory
const pathsDir = path.join(__dirname, 'paths');
const pathsFiles = fs.readdirSync(pathsDir);

let paths = {};
pathsFiles.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(pathsDir, file);
        console.log(`Reading file: ${filePath}`);

        // Read file content and merge into paths
        const filePaths = readJSONFile(filePath);
        paths = { ...paths, ...filePaths };
    }
});

// Read and combine all files in the 'components' directory
const componentsDir = path.join(__dirname, 'components');
const componentsFiles = fs.readdirSync(componentsDir);

let components = {};
componentsFiles.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(componentsDir, file);
        console.log(`Reading file: ${filePath}`);

        // Read file content and merge into components
        const fileComponents = readJSONFile(filePath);
        components = { ...components, ...fileComponents };
    }
});

// Read the remaining files
const info = readJSONFile(path.join(__dirname, 'info.json'));
const servers = readJSONFile(path.join(__dirname, 'servers.json'));

// Combine components into a complete Swagger document
const swaggerDocument = {
    openapi: '3.0.0',
    info: info,
    servers: servers,
    paths: paths,
    components: components
};

// Path to the swagger.json file
const swaggerFilePath = path.join(__dirname, './dist/swagger.json');

// Create the directory if it doesn't exist
fs.mkdirSync(path.dirname(swaggerFilePath), { recursive: true });

// Write the combined JSON file
fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerDocument, null, 2));

console.log('Swagger JSON file created successfully at', swaggerFilePath);
