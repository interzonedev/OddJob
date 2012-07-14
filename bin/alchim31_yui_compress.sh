#!/bin/sh

source `pwd`/bin/maven_command.sh $*

$mvnCmd"net.alchim31.maven:yuicompressor-maven-plugin:compress"
