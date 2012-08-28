OddJob - An Object Oriented JavaScript Framework
================================

OddJob is a way to have Java-like object inheritance and package organization.

More info coming soon.

Building
--------

To produce a compressed version of the source run from the command line in the OddJob project root:
./bin/alchim31_yui_compress.sh

Running Tests
-------------

Add the following to your Apache httpd.conf:
ProxyPass /<oddjob web URL>/ajaxTest http://localhost:5001/oddjob/ajaxTest
ProxyPassReverse /<oddjob web URL>/ajaxTest http://localhost:5001/oddjob/ajaxTest

From the command line in the OddJob project root:
mvn clean package
./bin/ajax_test_servlet.sh
