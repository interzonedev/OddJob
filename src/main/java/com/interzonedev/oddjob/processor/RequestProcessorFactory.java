package com.interzonedev.oddjob.processor;

import javax.servlet.http.HttpServletRequest;

/**
 * Factory for instances of {@link RequestProcessor} according to content type.
 * 
 * @author <a href="mailto:mark@interzonedev.com">Mark Markarian</a>
 */
public class RequestProcessorFactory {

	private static JsonRequestProcessor jsonRequestProcessor = new JsonRequestProcessor();
	private static HtmlRequestProcessor htmlRequestProcessor = new HtmlRequestProcessor();
	private static XmlRequestProcessor xmlRequestProcessor = new XmlRequestProcessor();

	/**
	 * <p>
	 * Gets an instance of the concrete implementation of {@link RequestProcessor} depending on the "type" parameter of
	 * the specified {@link HttpServletRequest}.
	 * </p>
	 * 
	 * <p>
	 * The implementation of {@link RequestProcessor} returned according to the "type" request parameter:<br />
	 * html: {@link HtmlRequestProcessor}<br />
	 * json: {@link JsonRequestProcessor}<br />
	 * xml: {@link XmlRequestProcessor}<br />
	 * </p>
	 * 
	 * @param request
	 *            The current {@link HttpServletRequest}
	 * 
	 * @return Returns an instance of the concrete implementation of {@link RequestProcessor} depending on the "type"
	 *         parameter of the specified {@link HttpServletRequest}.
	 */
	public static RequestProcessor getRequestProcessor(HttpServletRequest request) {
		String type = request.getParameter("type");

		if ("json".equals(type)) {
			return jsonRequestProcessor;
		} else if ("xml".equals(type)) {
			return xmlRequestProcessor;
		} else {
			return htmlRequestProcessor;
		}
	}

}
