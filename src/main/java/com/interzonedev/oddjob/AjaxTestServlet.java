package com.interzonedev.oddjob;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.servlet.Context;
import org.mortbay.jetty.servlet.ServletHolder;

public class AjaxTestServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().print("<div>Ajax Test</div>");
	}

	public static void main(String[] args) throws Exception {
		int port = 5001;
		String contextPath = "/oddjob";
		HttpServlet servlet = new AjaxTestServlet();
		String servletMapping = "/ajaxTest";

		Server server = new Server(port);
		Context context = new Context(server, contextPath, Context.SESSIONS);
		context.addServlet(new ServletHolder(servlet), servletMapping);
		server.start();
		server.join();
	}

}
