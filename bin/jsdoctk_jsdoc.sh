#!/bin/sh

source `pwd`/bin/maven_command.sh $*

$mvnCmd"jsdoctk:jsdoc"
