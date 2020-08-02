# bootstrap-jquery-component-based-build
This is a more modular/component-based approach to using JQuery (similar to a ReactJS approach). Bootstrap is used for frontend view purposes.

1.  GENERAL
    (i)     Components
            All JS and SCSS is component based.
            Any HTML DOM with the attribute of "data-component" is a functional component and is used as such in the SCSS and JS.
            See examples for:
                (a) JS and how it's set up in the /assets/js/components folder
                    (a.i) the base JS in /assets/js/app.first.js - how the base components (app.Component) is set up and further components are derived from this in the components folder
                    (a.ii) the JS to run last in /assets/js/app.last.js (typically initializing functions previously defined)
                (b) SCSS and how I structure it all in the /assets/scss/components folder
                    (b.i) base SCSS in the /assets/scss/base folder
                    (b.ii) first scss in the /assets/scss/_settings.first.scss file
                    (b.iii) last scss in the /assets/scss/_settings.last.scss file
                    (b.iv) The _variables.scss in "/assets/scss/" is a copy of the file in "bower_components/bootstrap/scss" and can be modified however needed
                (c) Naming conventions
                    (c.i) HTML: components in the HTML should be camelCase (also in the SCSS). e.g:
                            <div data-component="thisName"></div>
                    (c.ii) JS: the JS initializes with CapitalCamelCase. e.g:
                            app.ThisName = class extends app.Component {}
                    (c.iii) SCSS: components are targeted by [data-component="thisName"]
                    (c.iv)  FILE NAMES: SCSS and JS filenames for components should be CapitalCamelCase. e.g: ThisName.scss / ThisName.js

    (ii)    Compiling
            Gulp and BABEL is used for compiling everything. Additionally the yargs module is used to define JS/SCSS directories used in compiling. The files in these directories can be used to include in your main SCSS files.
            See example:
                (a) config.yml using "bower_components/bootstrap/scss" as a "sass_libs" by which each .scss file can be imported in the main scss file if needed.
                (b) /assets/scss/app.scss using @import "functions" to import the 'functions.scss' bootstrap file from the bootstrap "sass_libs"
            Compile order is the order in which libraries and directories is defined in the config.yml file
    # NB NB NB NB NB
            Because we are using ES6 and BABEL, gulp doesn't by default compile the code to be IE friendly. I've set it up in this way to compile faster for the dev environment. The css also isn't uglified/minified at this point.
            To make the code IE friendly, run "npm run build" or "gulp build --production" when ready for testing in IE or when ready for deploying to production.

    (iii)   Resources
            Be sure to run "npm install" first and then run "bower install"
            "Bower" needs to be installed globally on your PC. Use command "npm install -g bower"
            "bower install" will install the necessary dev packages defined in "bower.json"

    (iv)    Imports:
            For SCSS responsiveness, I use default Bootstrap mixins instead of @media queries. These mixins are included by @import "mixins" in the /assets/scss/app.scss file.
            See examples:
                (a) /assets/scss/base/typography.scss

2.  POPUPS:
    In the /snippets folder you will find a test popup. This is appended to the footer.php file.
    To have the popup display, it needs a class of 'active'.

3.  htaccess
    .htaccess handles removing the .php from the url