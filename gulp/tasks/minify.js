import htmlmin from "gulp-htmlmin";

import csso from "gulp-csso";

import gulpJsmin from "gulp-jsmin";

export const minifyHTML = () => {
   return app.gulp
      .src(`${app.path.build}/**/*.html`)
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(app.gulp.dest(`${app.path.build}`));
};

export const minifyCSS = () => {
   return app.gulp
      .src(`${app.path.build}/css/**/*.css`)
      .pipe(csso())
      .pipe(app.gulp.dest(`${app.path.build}/css`));
};

export const minifyJS = () => {
   return app.gulp
      .src(`${app.path.build}/js/**/*.js`)
      .pipe(gulpJsmin())
      .pipe(app.gulp.dest(`${app.path.build}/js`));
};
