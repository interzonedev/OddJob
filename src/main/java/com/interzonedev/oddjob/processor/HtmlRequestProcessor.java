package com.interzonedev.oddjob.processor;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * Concrete implementation of {@link RequestProcessor} for the HTML content type.
 * 
 * @author <a href="mailto:mark@interzonedev.com">Mark Markarian</a>
 */
public class HtmlRequestProcessor extends AbstractRequestProcessor {

	public static final String HTML_CONTENT_TYPE = "text/html";

	/**
	 * Provides the content, content type and status code for the specified {@link HttpServletRequest} in the form of a
	 * {@link ResponseValues} instance for the HTML content type. Echos the incoming method, parameters, headers and
	 * cookies of the specified {@link HttpServletRequest} to the content.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 */
	@Override
	public ResponseValues getResponse(HttpServletRequest request) throws Exception {
		int statusCode = getStatusCodeForRequest(request);

		StringBuilder content = new StringBuilder("<div>");

		// Output the request method.
		content.append("<div id=\"method\">");
		content.append(request.getMethod().toLowerCase());
		content.append("</div>");

		// Echo the request parameters back to the response.
		Map<String, List<String>> parametersMap = getParametersMap(request);
		content.append("<dl id=\"parameters\">");
		for (String parameterName : parametersMap.keySet()) {
			content.append("<dt>").append(parameterName).append("</dt>");
			List<String> parameterValues = parametersMap.get(parameterName);
			for (String parameterValue : parameterValues) {
				content.append("<dd>").append(parameterValue).append("</dd>");
			}
		}
		content.append("</dl>");

		// Echo the request headers back to the response.
		Map<String, List<String>> headersMap = getHeadersMap(request);
		content.append("<dl id=\"headers\">");
		for (String headerName : headersMap.keySet()) {
			content.append("<dt>").append(headerName).append("</dt>");
			List<String> headerValues = headersMap.get(headerName);
			for (String headerValue : headerValues) {
				content.append("<dd>").append(headerValue).append("</dd>");
			}
		}
		content.append("</dl>");

		// Echo the request cookies back to the response.
		Map<String, String> cookiesMap = getCookiesMap(request);
		content.append("<dl id=\"cookies\">");
		for (String cookieName : cookiesMap.keySet()) {
			content.append("<dt>").append(cookieName).append("</dt>");
			String cookieValue = cookiesMap.get(cookieName);
			content.append("<dd>").append(cookieValue).append("</dd>");
		}
		content.append("</dl>");

		content.append("</div>");

		return new ResponseValues(HTML_CONTENT_TYPE, statusCode, content.toString());
	}

}
