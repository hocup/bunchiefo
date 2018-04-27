let gulp = require('gulp');
let ts = require('gulp-typescript');
let mocha = require('gulp-mocha');
let del = require('del');

let tsMain = ts.createProject("tsconfig.json");
let tsTest = ts.createProject("tsconfig-test.json");

let paths = {
    ts: {
        src: "src/**/*.ts",
        dest: "build/dist/"
    },
    test: {
        src: "test/**/*.test.ts",
        dest: "build/test/"
    },
    testRun: {
        src: "build/test/**/*.test.js"
    }
}

function deleteBuild() {
    return del("build");
}

function compileTs() {
    return tsMain.src()
        .pipe(tsMain())
        .js
        .pipe(gulp.dest(paths.ts.dest));
}

function compileTests() {
    return tsTest.src()
        .pipe(tsTest())
        .js
        .pipe(gulp.dest(paths.test.dest));
}

function runTests() {
    return gulp.src(paths.testRun.src).pipe(mocha());
}

function watch() {
    gulp.watch(paths.test.src, gulp.series(compileTests, runTests))
    gulp.watch(paths.ts.src, gulp.series(compileTs, compileTests, runTests));
}

let clean = deleteBuild;
let build = compileTs;
let test = gulp.series(compileTests, runTests);


exports.clean = clean;
exports.build = build;
exports.test = test;
exports.watch = watch;