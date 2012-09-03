package com.interzonedev.oddjob.processor;

import javax.servlet.http.HttpServletRequest;

/**
 * Simple interface for processing an incoming {@link HttpServletRequest} into a {@link ResponseValues} instance.
 * 
 * @author <a href="mailto:mark@interzonedev.com">Mark Markarian</a>
 */
public interface RequestProcessor {

	/**
	 * Provides the content, content type and status code for the specified {@link HttpServletRequest} in the form of a
	 * {@link ResponseValues} instance. The values are set according to the "type" and "error" request parameters.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns an instance of {@link ResponseValues} with values set according to the "type" and "error" request
	 *         parameters.
	 * 
	 * @throws Exception
	 *             Thrown if there was an error creating the content.
	 */
	public ResponseValues getResponse(HttpServletRequest request) throws Exception;
}
