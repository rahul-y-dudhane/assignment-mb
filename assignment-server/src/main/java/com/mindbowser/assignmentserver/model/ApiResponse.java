package com.mindbowser.assignmentserver.model;

/**
 * Data transfer model for api response
 * 
 * @author rahuld
 *
 * @param <T>
 */
public class ApiResponse<T> {

	private boolean success;
	private String message;
	private T data;

	public ApiResponse(boolean success, String message, T data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getMessage() {
		return message;
	}

	public T getData() {
		return data;
	}

}
