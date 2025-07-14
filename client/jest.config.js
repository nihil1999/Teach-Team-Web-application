// /** @type {import('jest').Config} */
// const config = {
//   preset: 'ts-jest/presets/js-with-ts', 
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', {
//       useESM: false,      
//       tsconfig: './tsconfig.json',
//     }],
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     '^next/router$': 'next-router-mock',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
//   testPathIgnorePatterns: ['/node_modules/', '/.next/'],
// };

//module.exports = config;

module.exports = {
  preset: "ts-jest/presets/js-with-ts", // allow babel + ts
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // tells Jest to use Babel for JSX
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};


