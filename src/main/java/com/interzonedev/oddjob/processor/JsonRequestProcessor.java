package com.interzonedev.oddjob.processor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Concrete implementation of {@link RequestProcessor} for the JSON content type.
 * 
 * @author <a href="mailto:mark@interzonedev.com">Mark Markarian</a>
 */
public class JsonRequestProcessor extends AbstractRequestProcessor {

	public static final String JSON_CONTENT_TYPE = "application/json";

	/**
	 * Provides the content, content type and status code for the specified {@link HttpServletRequest} in the form of a
	 * {@link ResponseValues} instance for the JSON content type. Echos the incoming method, parameters, headers and
	 * cookies of the specified {@link HttpServletRequest} to the content.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 */
	@Override
	public ResponseValues getResponse(HttpServletRequest request) throws Exception {
		int statusCode = getStatusCodeForRequest(request);

		Map<String, Object> contentMap = new HashMap<String, Object>();

		// Output the request method.
		contentMap.put("method", request.getMethod().toLowerCase());

		// Echo the request parameters back to the response.
		Map<String, List<String>> parametersMap = getParametersMap(request);
		contentMap.put("parameters", parametersMap);

		// Echo the request headers back to the response.
		Map<String, List<String>> headersMap = getHeadersMap(request);
		contentMap.put("headers", headersMap);

		// Echo the request cookies back to the response.
		Map<String, String> cookiesMap = getCookiesMap(request);
		contentMap.put("cookies", cookiesMap);

		// Transform the content map to JSON.
		String content = (new ObjectMapper()).writeValueAsString(contentMap);

		return new ResponseValues(JSON_CONTENT_TYPE, statusCode, content);
	}

}
