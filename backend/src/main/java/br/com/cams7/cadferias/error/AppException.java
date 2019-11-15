/**
 * 
 */
package br.com.cams7.cadferias.error;

import lombok.Getter;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@Getter
public class AppException extends RuntimeException {

	private String codeMessage;
	private Object[] args;

	public AppException(String codeMessage, Object... args) {
		super();
		this.codeMessage = codeMessage;
		this.args = args;
	}

	public AppException(String message, Throwable cause) {
		super(message, cause);
	}

}
