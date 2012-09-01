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

import com.interzonedev.oddjob.processor.HtmlRequestProcessor;
import com.interzonedev.oddjob.processor.JsonRequestProcessor;
import com.interzonedev.oddjob.processor.RequestProcessor;
import com.interzonedev.oddjob.processor.RequestProcessorFactory;
import com.interzonedev.oddjob.processor.ResponseValues;
import com.interzonedev.oddjob.processor.XmlRequestProcessor;

/**
 * Servlet that handles Ajax requests from the OddJob JavaScript unit tests.
 * 
 * The content type is set on the response according to the "type" request parameter:
 * html: {@link HtmlRequestProcessor#HTML_CONTENT_TYPE} json: {@link JsonRequestProcessor#JSON_CONTENT_TYPE} xml:
 * {@link XmlRequestProcessor#XML_CONTENT_TYPE}
 * 
 * The status code is set on the response according to the "error" request parameter regardless of the content type. If
 * the "error" request parameter can be parsed to a {@link Boolean#TRUE} the status code is set to
 * {@link HttpServletResponse#SC_INTERNAL_SERVER_ERROR}, otherwise it is set to {@link HttpServletResponse#SC_OK}.
 * 
 * The content set on the reponse contains the request method, request parameters, request headers and requets cookies
 * regardless of the content type. Each request method is handled in the same fashion only differing in the request
 * method value in the output.
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
	 * Handles GET requests.
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
	 * Handles POST requests.
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		log.debug("doPost: Start");

		processResponseForRequest(request, response);

		log.debug("doPost: End");
	}

	/**
	 * Handles PUT requests.
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
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.debug("doPut: Start");

		processResponseForRequest(request, response);

		log.debug("doPut: End");
	}

	/**
	 * Handles DELETE requests.
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
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		log.debug("doDelete: Start");

		processResponseForRequest(request, response);

		log.debug("doDelete: End");
	}

	/**
	 * Sets the content type and status on the specified response and writes the content to the output stream.
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * @param response
	 *            The current {@link HttpServletResponse}
	 * 
	 * @throws ServletException
	 * @throws IOException
	 */
	private void processResponseForRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			RequestProcessor requestProcessor = RequestProcessorFactory.getRequestProcessor(request);

			ResponseValues responseValues = requestProcessor.getResponse(request, response);

			String contentType = responseValues.getContentType();
			int statusCode = responseValues.getStatusCode();
			String content = responseValues.getContent();

			response.setContentType(contentType);
			response.setStatus(statusCode);
			response.getWriter().print(content);
		} catch (Exception e) {
			String errorMessage = "Error processing request";
			log.error("processResponseForRequest: " + errorMessage, e);
			throw new ServletException(errorMessage, e);
		}
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
