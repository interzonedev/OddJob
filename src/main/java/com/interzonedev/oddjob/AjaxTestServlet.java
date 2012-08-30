package com.interzonedev.oddjob;

import java.io.IOException;

import javax.servlet.ServletException;
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
		String contentType = "text/html";

		return contentType;
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
		int status = HttpServletResponse.SC_OK;

		return status;
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
		String content = "<div>Ajax Test</div>";

		return content;
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
	 * {@link #DEFAULT_CONTEXT_PATH}/{@link #DEFAULT_SERVLET_MAPPING} on port {@link #DEFAULT_PORT}.
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
