/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import lombok.Getter;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@Getter
public abstract class AppException extends RuntimeException {

	private String codeMessage;
	private Object[] args;

	public AppException(String codeMessage, Object... args) {
		super();
		this.codeMessage = codeMessage;
		this.args = args;
	}

}
