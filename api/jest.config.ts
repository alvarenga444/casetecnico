import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",              
  testEnvironment: "node",        
  roots: ["<rootDir>/tests"],     
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", 
  },
  clearMocks: true,                
  verbose: true,                   
  collectCoverage: true,           
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts",              
    "!src/**/index.ts",            
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 75,
    },
  },
  coverageDirectory: "coverage",   
};

export default config;
