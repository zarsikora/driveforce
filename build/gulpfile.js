"use strict";

const autoprefixer = require("autoprefixer");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browsersync = require('browser-sync');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        proxy: 'localhost/driveforce',
        open: false,
        notify: false,
        ghostMode: false,
        ui: {
            port: 8001
        }
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function styles() {
    return gulp
        .src("./scss/style.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(postcss([autoprefixer()/*, cssnano()*/]))
        .pipe(gulp.dest('./../')) //root theme directory
}

function scripts() {
    return (
        gulp.src([
            "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./node_modules/blazy/blazy.js",
            "./node_modules/paper/dist/paper-core.js",
            "./node_modules/simplebar/dist/simplebar.js",
            "./node_modules/@barba/core/dist/barba.umd.js",
            "./node_modules/gsap/dist/gsap.js",
            "./node_modules/splitting/dist/splitting.js",
            "./js/fast-checkout.js",
            "./js/sharpspring.js",
            "./js/main.js"
            ])
            .pipe(concat('bundle.js'))
            .pipe(plumber())
            .pipe(gulp.dest('./../'))
    );
}

function watchFiles() {
    gulp.watch("./scss/**/*", gulp.series(styles, browserSyncReload));
    gulp.watch("./js/**/*", gulp.series(scripts, browserSyncReload));
}

const build = gulp.parallel(styles, scripts);
const watch = gulp.series(styles, scripts, browserSync, watchFiles);

// export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = build; 