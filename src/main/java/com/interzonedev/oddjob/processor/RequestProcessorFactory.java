package com.interzonedev.oddjob.processor;

import javax.servlet.http.HttpServletRequest;

public class RequestProcessorFactory {

	private static JsonRequestProcessor jsonRequestProcessor = new JsonRequestProcessor();
	private static HtmlRequestProcessor htmlRequestProcessor = new HtmlRequestProcessor();
	private static XmlRequestProcessor xmlRequestProcessor = new XmlRequestProcessor();

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
