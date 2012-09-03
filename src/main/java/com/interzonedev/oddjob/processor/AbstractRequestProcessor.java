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

/**
 * Abstract superclass for all implementations of {@link RequestProcessor}. Provides utility methods used by all
 * implementations. Handles the setting of the status code for all implementations.
 * 
 * @author <a href="mailto:mark@interzonedev.com">Mark Markarian</a>
 */
public abstract class AbstractRequestProcessor implements RequestProcessor {

	protected Logger log = (Logger) LoggerFactory.getLogger(getClass());

	/**
	 * Gets the status code for the specified request according to the "error" parameter if it is present.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns the status code for the specified request according to the "error" parameter if it is present.
	 *         Defaults to {@link HttpServletResponse#SC_OK}.
	 */
	protected int getStatusCodeForRequest(HttpServletRequest request) {
		if (isParameterSet(request, "error")) {
			return HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		} else {
			return HttpServletResponse.SC_OK;
		}
	}

	/**
	 * Transforms the parameters in the specified {@link HttpServletRequest} into a {@link Map} of parameter names to a
	 * {@link List} of parameter values.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns a {@link Map} of parameter names to a {@link List} of parameter values.
	 */
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

	/**
	 * Transforms the headers in the specified {@link HttpServletRequest} into a {@link Map} of header names to a
	 * {@link List} of header values.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns a {@link Map} of header names to a {@link List} of header values.
	 */
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

	/**
	 * Transforms the cookies in the specified {@link HttpServletRequest} into a {@link Map} of cookie names to cookie
	 * values.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns a {@link Map} of cookie names to cookie values.
	 */
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

	/**
	 * Determines whether or not the parameter with the specified name in the specified {@link HttpServletRequest} is
	 * set and can be parsed to a {@link Boolean#TRUE}.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * @param parameterName
	 *            The name of the parameter to check
	 * 
	 * @return Returns true if the parameter with the specified name in the specified {@link HttpServletRequest} is set
	 *         and can be parsed to a {@link Boolean#TRUE}, otherwise returns false.
	 */
	private boolean isParameterSet(HttpServletRequest request, String parameterName) {
		String parameterValue = request.getParameter(parameterName);
		if ((null != parameterValue) && Boolean.parseBoolean(parameterValue)) {
			return true;
		} else {
			return false;
		}
	}
}
