module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "\\.ts$": "ts-jest",
    },
    coverageReporters: ["lcov", "text-summary"],
    collectCoverageFrom: ["packages/*/src/**/*.ts"],
    coveragePathIgnorePatterns: ["/templates/"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    globals: {
        "ts-jest": {
            diagnostics: { warnOnly: true },
        },
    },
}
