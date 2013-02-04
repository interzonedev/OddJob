OddJob - An Object Oriented JavaScript Framework
================================

Oddjob provides a framework for writing classes in JavaScript that mimic classical inheritance.

It also provides a basis for organizing JavaScript classes and closures into Java-like packages.

The OddJob framework was inspired by the inheritance functionality in Dean Edward's [base2](https://code.google.com/p/base2) framework (here are the [docs](http://base2.googlecode.com/svn/version/1.0.2/doc/base2.html#/doc/!base2.Base)) and John Resig's blog on [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance).  The packaging functionality was inspired by the [Dojo](http://dojotoolkit.org) toolkit. It also sprung from some front end work I did with [Brian Dillard](http://www.briandillard.com) and [Kem Apak](http://www.linkedin.com/in/kemapak).

The core ObbJob library is very lightweight and contains the ability to create classes and package hierarchies, define namespaces for package like structures and a minimal set of utility methods.

Optional components can be included in custom [builds](http://oddjob.interzonedev.com)
+ Ajax: A package for performing asynchronous and synchronous HTTP requests
+ Logger: A wrapper around 3rd party logger frameworks to provide a common logging API
+ jQuery Utils: Utility methods for use in a jQuery based system if the jQuery library is included

File Structure
--------------

`/src/main/javascript` - The Oddjob JavaScript source code  
`/src/main/java` - Java code that runs a servlet for unit testing the Ajax component  
`/src/test/javascript` - The JavaScript unit testing code  
`/src/test/javascript-resources` - JavaScript library code and HTML pages that support unit testing  

Building
--------

The Oddjob source and test code is built using Maven via the command line and scripts in the `bin` directory.

Running `mvn clean package` from the command line in the OddJob project root will copy all the necessary files to run unit tests to the directory specified by the `webserver.deploy.dir` property in the `build.properties` file.  The default value is `/Users/${user.name}/Sites/oddjob` which on a Mac will land the files in the `oddjob` directory in current user's personal Apache docroot and can accessed in a browser at `http://localhost/~${user.name}/oddjob`.

The source code is compressed using the [YUI Compressor plugin](https://github.com/davidB/yuicompressor-maven-plugin).

To produce a compressed version of the source run from the command line in the OddJob project root:
`./bin/alchim31_yui_compress.sh`

Docs
----

All of the classes, closures and methods in the OddJob framework are commented in JSDoc fashion.  There are scripts to produce the JSDoc output from the [jsdoc-toolkit](http://code.google.com/p/jsdoctk-plugin) and [JSTools](http://www.dev.abiss.gr/mvn-jstools/) libraries.

To produce JSDoc output from the jsdoc-toolkit plugin run from the command line in the OddJob project root:  
`./bin/jsdoctk_jsdoc.sh`

To produce JSDoc output from the JSTools JSDoc plugin run from the command line in the OddJob project root:  
`./bin/jstools_jsdoc.sh`

Lint
----

To produce JS lint warnings and errors from the JSTools JSLint plugin run from the command line in the OddJob project root:  
`./bin/jstools_jslint.sh`

Running Tests
-------------

Add the following to your Apache httpd.conf:  
`ProxyPass /<oddjob web URL>/ajaxTest http://localhost:5001/oddjob/ajaxTest`  
`ProxyPassReverse /<oddjob web URL>/ajaxTest http://localhost:5001/oddjob/ajaxTest`

From the command line in the OddJob project root:  
`mvn clean package`  
`./bin/ajax_test_servlet.sh`
