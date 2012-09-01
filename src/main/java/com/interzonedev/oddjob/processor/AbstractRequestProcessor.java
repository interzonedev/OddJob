package com.interzonedev.oddjob.processor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;

public abstract class AbstractRequestProcessor implements RequestProcessor {

	protected Logger log = (Logger) LoggerFactory.getLogger(getClass());

	/**
	 * Gets the status code for the specified request according to the "error"
	 * parameter if it is present.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns the status code for the specified request according to
	 *         the "error" parameter if it is present. Defaults to {@link HttpServletResponse#SC_OK}.
	 */
	protected int getStatusForRequest(HttpServletRequest request) {
		if (isParameterSet(request, "error")) {
			return HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		} else {
			return HttpServletResponse.SC_OK;
		}
	}

	protected Map<String, List<String>> getParametersMap(HttpServletRequest request) {
		Map<String, List<String>> parametersMap = new HashMap<String, List<String>>();

		@SuppressWarnings("unchecked")
		Map<String, String[]> rawParameterMap = request.getParameterMap();
		for (String parameterName : rawParameterMap.keySet()) {
			String[] rawParameterValues = rawParameterMap.get(parameterName);
			List<String> parameterValues = Arrays.asList(rawParameterValues);
			parametersMap.put(parameterName, parameterValues);
		}

		return parametersMap;
	}

	@SuppressWarnings("unchecked")
	protected Map<String, List<String>> getHeadersMap(HttpServletRequest request) {
		Map<String, List<String>> headersMap = new HashMap<String, List<String>>();

		for (Enumeration<String> headerNames = request.getHeaderNames(); headerNames.hasMoreElements();) {
			String headerName = headerNames.nextElement();
			List<String> headerValues = new ArrayList<String>();
			for (Enumeration<String> rawHeaderValues = request.getHeaders(headerName); rawHeaderValues
					.hasMoreElements();) {
				String headerValue = rawHeaderValues.nextElement();
				headerValues.add(headerValue);
			}
			headersMap.put(headerName, headerValues);
		}

		return headersMap;
	}

	protected Map<String, String> getCookiesMap(HttpServletRequest request) {
		Map<String, String> cookiesMap = new HashMap<String, String>();

		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				String cookieName = cookie.getName();
				String cookieValue = cookie.getValue();
				cookiesMap.put(cookieName, cookieValue);
			}
		}

		return cookiesMap;
	}

	private boolean isParameterSet(HttpServletRequest request, String parameterName) {
		String parameterValue = request.getParameter(parameterName);
		if ((null != parameterValue) && Boolean.parseBoolean(parameterValue)) {
			return true;
		} else {
			return false;
		}
	}
}
