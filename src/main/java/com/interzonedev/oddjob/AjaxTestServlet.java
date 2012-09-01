package com.interzonedev.oddjob;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.servlet.Context;
import org.mortbay.jetty.servlet.ServletHolder;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.util.StatusPrinter;

/**
 * Servlet that handles Ajax requests from the OddJob JavaScript unit tests. Returns simple content, content type and
 * status code depending on the parameters in the requeset.
 * 
 * @author mmarkarian
 */
public class AjaxTestServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final int DEFAULT_PORT = 5001;
	private static final String DEFAULT_CONTEXT_PATH = "/oddjob";
	private static final String DEFAULT_SERVLET_MAPPING = "/ajaxTest";

	private Logger log = (Logger) LoggerFactory.getLogger(getClass());

	/**
	 * Handles GET requests. Sets the content type and output according to the "type" request parameter. Sets the status
	 * according to the "error" request parameter.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * @param response
	 *            The current {@link HttpServletResponse}
	 * 
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.debug("doGet: Start");

		processResponseForRequest(request, response);

		log.debug("doGet: End");
	}

	/**
	 * Sets the content type and status on the specified response and writes the content to the output stream.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * @param response
	 *            The current {@link HttpServletResponse}
	 * 
	 * @throws IOException
	 */
	private void processResponseForRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String contentType = getContentTypeForRequest(request);
		int status = getStatusForRequest(request);
		String content = getContentForRequest(request);

		response.setContentType(contentType);
		response.setStatus(status);
		response.getWriter().print(content);
	}

	/**
	 * Gets the content type for the specified request according to the "type" parameter if it is present.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns the content type for the specified request according to the "type" parameter if it is present.
	 *         Defaults to "text/html";
	 */
	private String getContentTypeForRequest(HttpServletRequest request) {
		String type = request.getParameter("type");

		if ("json".equals(type)) {
			return "application/json";
		} else if ("xml".equals(type)) {
			return "text/xml";
		} else {
			return "text/html";
		}
	}

	/**
	 * Gets the status code for the specified request according to the "error" parameter if it is present.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns the status code for the specified request according to the "error" parameter if it is present.
	 *         Defaults to {@link HttpServletResponse#SC_OK}.
	 */
	private int getStatusForRequest(HttpServletRequest request) {
		if (isParameterSet(request, "error")) {
			return HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		} else {
			return HttpServletResponse.SC_OK;
		}
	}

	/**
	 * Gets the content for the specified request according to the "type" parameter if it is present. Echos the request
	 * parameters to the content.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns the content for the specified request according to the "type" parameter if it is present.
	 */
	private String getContentForRequest(HttpServletRequest request) {
		String type = request.getParameter("type");

		if ("json".equals(type)) {
			return getJsonContent(request);
		} else if ("xml".equals(type)) {
			return getXmlContent(request);
		} else {
			return getHtmlContent(request);
		}
	}

	private boolean isParameterSet(HttpServletRequest request, String parameterName) {
		String parameterValue = request.getParameter(parameterName);
		if ((null != parameterValue) && Boolean.parseBoolean(parameterValue)) {
			return true;
		} else {
			return false;
		}
	}

	private String getJsonContent(HttpServletRequest request) {
		StringBuilder content = new StringBuilder("{");

		content.append("\"method\":\"").append(request.getMethod().toLowerCase()).append("\",");

		// Echo the request parameters back to the response.
		Map<String, List<String>> parametersMap = getParametersMap(request);
		content.append("\"parameters\":[");
		for (String parameterName : parametersMap.keySet()) {
			content.append("{");
			content.append("\"name\":\"").append(parameterName).append("\",");
			content.append("\"values\":[");
			List<String> parameterValues = parametersMap.get(parameterName);
			for (String parameterValue : parameterValues) {
				content.append("\"").append(parameterValue).append("\",");
			}
			if (!parameterValues.isEmpty()) {
				content.deleteCharAt(content.length() - 1);
			}
			content.append("]");
			content.append("},");
		}
		if (!parametersMap.isEmpty()) {
			content.deleteCharAt(content.length() - 1);
		}
		content.append("],");

		// Echo the request headers back to the response.
		Map<String, List<String>> headersMap = getHeadersMap(request);
		content.append("\"headers\":[");
		for (String headerName : headersMap.keySet()) {
			content.append("{");
			content.append("\"name\":\"").append(headerName).append("\",");
			content.append("\"values\":[");
			List<String> headerValues = headersMap.get(headerName);
			for (String headerValue : headerValues) {
				content.append("\"").append(headerValue.replaceAll("\"", "\\\\\"")).append("\",");
			}
			if (!headerValues.isEmpty()) {
				content.deleteCharAt(content.length() - 1);
			}
			content.append("]");
			content.append("},");
		}
		if (!headersMap.isEmpty()) {
			content.deleteCharAt(content.length() - 1);
		}
		content.append("],");

		// Echo the request cookies back to the response.
		Map<String, String> cookiesMap = getCookiesMap(request);
		content.append("\"cookies\":[");
		for (String cookieName : cookiesMap.keySet()) {
			String cookieValue = cookiesMap.get(cookieName);
			content.append("{");
			content.append("\"name\":\"").append(cookieName).append("\",");
			content.append("\"value\":\"").append(cookieValue).append("\"");
			content.append("},");
		}
		if (!cookiesMap.isEmpty()) {
			content.deleteCharAt(content.length() - 1);
		}
		content.append("]");

		content.append("}");

		return content.toString();
	}

	private String getXmlContent(HttpServletRequest request) {
		StringBuilder content = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

		content.append("<response method=\"").append(request.getMethod().toLowerCase()).append("\">");

		// Echo the request parameters back to the response.
		Map<String, List<String>> parametersMap = getParametersMap(request);
		content.append("<parameters>");
		for (String parameterName : parametersMap.keySet()) {
			content.append("<parameter>");
			content.append("<name>").append("<![CDATA[").append(parameterName).append("]]>").append("</name>");
			content.append("<values>");
			List<String> parameterValues = parametersMap.get(parameterName);
			for (String parameterValue : parameterValues) {
				content.append("<value>").append("<![CDATA[").append(parameterValue).append("]]>").append("</value>");
			}
			content.append("</values>");
			content.append("</parameter>");
		}
		content.append("</parameters>");

		// Echo the request headers back to the response.
		Map<String, List<String>> headersMap = getHeadersMap(request);
		content.append("<headers>");
		for (String headerName : headersMap.keySet()) {
			content.append("<header>");
			content.append("<name>").append("<![CDATA[").append(headerName).append("]]>").append("</name>");
			content.append("<values>");
			List<String> headerValues = headersMap.get(headerName);
			for (String headerValue : headerValues) {
				content.append("<value>").append("<![CDATA[").append(headerValue).append("]]>").append("</value>");
			}
			content.append("</values>");
			content.append("</header>");
		}
		content.append("</headers>");

		// Echo the request cookies back to the response.
		Map<String, String> cookiesMap = getCookiesMap(request);
		content.append("<cookies>");
		for (String cookieName : cookiesMap.keySet()) {
			String cookieValue = cookiesMap.get(cookieName);
			content.append("<cookie>");
			content.append("<name>").append("<![CDATA[").append(cookieName).append("]]>").append("</name>");
			content.append("<value>").append("<![CDATA[").append(cookieValue).append("]]>").append("</value>");
			content.append("</cookie>");
		}
		content.append("</cookies>");

		content.append("</response>");

		return content.toString();
	}

	private String getHtmlContent(HttpServletRequest request) {
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

		return content.toString();
	}

	private Map<String, List<String>> getParametersMap(HttpServletRequest request) {
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
	private Map<String, List<String>> getHeadersMap(HttpServletRequest request) {
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

	private Map<String, String> getCookiesMap(HttpServletRequest request) {
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
	 * Configures the logger context programmatically to avoid an external configuration file.
	 */
	private static void configureLoggerContext() {
		LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
		loggerContext.reset();

		// Set log levels on individual packages.
		loggerContext.getLogger("org.mortbay.log").setLevel(Level.INFO);
		loggerContext.getLogger("com.interzonedev.oddjob").setLevel(Level.DEBUG);

		String logPattern = "%date [%thread] %-5level %logger - %msg%n";
		PatternLayoutEncoder patternLayoutEncoder = new PatternLayoutEncoder();
		patternLayoutEncoder.setContext(loggerContext);
		patternLayoutEncoder.setPattern(logPattern);
		patternLayoutEncoder.start();

		ConsoleAppender<ILoggingEvent> consoleAppender = new ConsoleAppender<ILoggingEvent>();
		consoleAppender.setContext(loggerContext);
		consoleAppender.setName("consoleAppender");
		consoleAppender.setEncoder(patternLayoutEncoder);
		consoleAppender.start();

		loggerContext.getLogger(Logger.ROOT_LOGGER_NAME).addAppender(consoleAppender);
		loggerContext.start();

		StatusPrinter.printInCaseOfErrorsOrWarnings(loggerContext);
	}

	/**
	 * Starts an embedded webserver to serve this servlet. By default the servlet will be mapped to
	 * {@link #DEFAULT_CONTEXT_PATH}/ {@link #DEFAULT_SERVLET_MAPPING} on port {@link #DEFAULT_PORT}.
	 * 
	 * @param args
	 * 
	 * @throws Exception
	 *             Thrown if an error occurs starting the embedded webserver.
	 */
	public static void main(String[] args) throws Exception {
		configureLoggerContext();

		int port = DEFAULT_PORT;
		String contextPath = DEFAULT_CONTEXT_PATH;
		String servletMapping = DEFAULT_SERVLET_MAPPING;

		HttpServlet servlet = new AjaxTestServlet();

		Server server = new Server(port);
		Context context = new Context(server, contextPath, Context.SESSIONS);
		context.addServlet(new ServletHolder(servlet), servletMapping);
		server.start();
		server.join();
	}

}
