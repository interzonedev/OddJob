#!/bin/sh

source `pwd`/bin/maven_command.sh $*

$mvnCmd"gr.abiss.mvn.plugins:maven-jstools-plugin:jslint"
