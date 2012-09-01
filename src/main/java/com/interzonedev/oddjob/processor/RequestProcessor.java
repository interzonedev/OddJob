package com.interzonedev.oddjob.processor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface RequestProcessor {
	public ResponseValues getResponse(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
