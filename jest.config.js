/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/*.test.ts"],
  // How many failures before it stops running tests
  bail: 1,
  notify: true,
  notifyMode: "failure-change",
}
