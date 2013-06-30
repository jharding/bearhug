[![build status](https://secure.travis-ci.org/jharding/bearhug.png?branch=master)](http://travis-ci.org/jharding/bearhug)

Bearhug
=======

Bearhug wraps text patterns with configurbale html tags. It's fast, flexible, 
and best of all, has no dependencies.

Download
--------

* [bearhug.js v0.1.0][bearhug.js]

Usage
-----

### Options

The available options that can be passed to `window.bearhug`.

* `node` – The element to wrap patterns within. **Required**.

* `pattern` – A pattern or an array of patterns that bearhug will wrap. **Required**.

* `tagName` – The tag name of the element matched patterns will be wrapped in. Defaults to `strong`.

* `className` – The class of the element matched patterns will be wrapped in. 

* `wordsOnly` – If `true`, only whole words will be matched and wrapped. Defaults to `false`.

* `caseSensitive` – If `true`, pattern matching will be case sensitive. Defaults to `false`.

Example
-------

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/bearhug.js"></script>
  </head>
  <body>
    <article id="hipster-ipsum">
      <p>Craft beer cardigan trust fund, swag tumblr pork belly kale chips
      vegan plaid ethical artisan. Mumblecore wolf leggings cornhole before
      they sold out trust fund. Keffiyeh shabby chic pug Pinterest
      letterpress.<p>
    </article>

    <script>
      var node = document.getElementById('hipster-ipsum');

      bearhug({ node: node, pattern: ['beer', 'wolf'], className: 'stuff' })
    </script>
  </body>
</hmtl>
```

Testing
-------

Tests are written using [Jasmine][jasmine] and ran with [Karma][karma]. 
To run Bearhug's test suite with PhantomJS, run `npm test`.

Issues
------

Found a bug? Create an issue on GitHub.

https://github.com/jharding/bearhug/issues

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

License
-------

Copyright (c) 2013 [Jake Harding](http://thejakeharding.com)  
Licensed under the MIT License.

[bearhug.js]: https://raw.github.com/jharding/bearhug/master/bearhug.js 
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
