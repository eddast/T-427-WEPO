module.exports = {
    
    verbose: true,
    roots: [ 'src' ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    setupTestFrameworkScriptFile: "<rootDir>/enzyme.config.js",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js"
    }
}
