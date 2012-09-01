package com.interzonedev.oddjob.processor;

public class ResponseValues {

	private String contentType;

	private int statusCode;

	private String content;

	public ResponseValues(String contentType, int statusCode, String content) {
		this.contentType = contentType;
		this.statusCode = statusCode;
		this.content = content;
	}

	public String getContentType() {
		return contentType;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public String getContent() {
		return content;
	}

}
