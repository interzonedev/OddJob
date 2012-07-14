#!/bin/sh

#
# Exports the mvnCmd variable to be used as the base Maven command to which specific goals can be appended.
#
# Usage:
# -c, --clean Appends the clean goal to the base Maven command.
#

mvnCmdBuild="mvn "

while [ "$1" != "" ]; do
	PARAM=`echo $1 | awk -F= '{print $1}'`
	case $PARAM in
		-c | --clean)
			mvnCmdBuild=$mvnCmdBuild"clean "
			;;
		*)
			;;
	esac
	shift
done

export mvnCmd=$mvnCmdBuild
