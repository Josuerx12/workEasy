module.exports = {
  // Usa `ts-jest` para transformar arquivos TypeScript
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // Ignorar a transformação de node_modules, exceto se necessário
  transformIgnorePatterns: [
    "node_modules/(?!module-to-transform|other-module)",
  ],
  // Estender a busca de módulos para suportar TypeScript
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
