package com.interzonedev.oddjob.processor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonRequestProcessor extends AbstractRequestProcessor {

	public static final String JSON_CONTENT_TYPE = "application/json";

	@Override
	public ResponseValues getResponse(HttpServletRequest request, HttpServletResponse response) throws Exception {
		int statusCode = getStatusForRequest(request);

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
