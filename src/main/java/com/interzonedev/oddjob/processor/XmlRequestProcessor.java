package com.interzonedev.oddjob.processor;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class XmlRequestProcessor extends AbstractRequestProcessor {

	public static final String XML_CONTENT_TYPE = "text/xml";

	private DocumentBuilderFactory documentBuilderFactory;

	private DocumentBuilder documentBuilder;

	public XmlRequestProcessor() {
		init();
	}

	public void init() {
		documentBuilderFactory = DocumentBuilderFactory.newInstance();
		try {
			documentBuilder = documentBuilderFactory.newDocumentBuilder();
		} catch (ParserConfigurationException e) {
			throw new RuntimeException("init: Error configuring new XML document builder", e);
		}
	}

	@Override
	public ResponseValues getResponse(HttpServletRequest request, HttpServletResponse response) throws Exception {
		int statusCode = getStatusForRequest(request);

		Document document = documentBuilder.newDocument();
		Element rootElement = document.createElement("response");
		document.appendChild(rootElement);

		// Output the request method.
		rootElement.setAttribute("method", request.getMethod().toLowerCase());

		// Echo the request parameters back to the response.
		Map<String, List<String>> parametersMap = getParametersMap(request);
		Element parametersElement = document.createElement("parameters");
		rootElement.appendChild(parametersElement);
		for (String parameterName : parametersMap.keySet()) {
			Element parameterElement = document.createElement("parameter");
			parametersElement.appendChild(parameterElement);

			Element nameElement = document.createElement("name");
			nameElement.setTextContent(parameterName);
			parameterElement.appendChild(nameElement);

			Element valuesElement = document.createElement("values");
			parameterElement.appendChild(valuesElement);
			List<String> parameterValues = parametersMap.get(parameterName);
			for (String parameterValue : parameterValues) {
				Element valueElement = document.createElement("value");
				valueElement.setTextContent(parameterValue);
				valuesElement.appendChild(valueElement);
			}
		}

		// Echo the request headers back to the response.
		Map<String, List<String>> headersMap = getHeadersMap(request);
		Element headersElement = document.createElement("headers");
		rootElement.appendChild(headersElement);
		for (String headerName : headersMap.keySet()) {
			Element headerElement = document.createElement("header");
			headersElement.appendChild(headerElement);

			Element nameElement = document.createElement("name");
			nameElement.setTextContent(headerName);
			headerElement.appendChild(nameElement);

			Element valuesElement = document.createElement("values");
			headerElement.appendChild(valuesElement);
			List<String> headerValues = headersMap.get(headerName);
			for (String headerValue : headerValues) {
				Element valueElement = document.createElement("value");
				valueElement.setTextContent(headerValue);
				valuesElement.appendChild(valueElement);
			}
		}

		// Echo the request cookies back to the response.
		Map<String, String> cookiesMap = getCookiesMap(request);
		Element cookiesElement = document.createElement("cookies");
		rootElement.appendChild(cookiesElement);
		for (String cookieName : cookiesMap.keySet()) {
			String cookieValue = cookiesMap.get(cookieName);

			Element cookieElement = document.createElement("cookie");
			cookiesElement.appendChild(cookieElement);

			Element nameElement = document.createElement("name");
			nameElement.setTextContent(cookieName);
			cookieElement.appendChild(nameElement);

			Element valueElement = document.createElement("value");
			valueElement.setTextContent(cookieValue);
			cookieElement.appendChild(valueElement);
		}

		// Transform the XML document to a string.
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		DOMSource domSource = new DOMSource(document);

		StringWriter contentWriter = new StringWriter();
		StreamResult domOutput = new StreamResult(contentWriter);

		transformer.transform(domSource, domOutput);

		String content = contentWriter.toString();

		return new ResponseValues(XML_CONTENT_TYPE, statusCode, content);
	}

}
