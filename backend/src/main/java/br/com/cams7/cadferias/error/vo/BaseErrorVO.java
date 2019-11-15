/**
 * 
 */
package br.com.cams7.cadferias.error.vo;

import lombok.Getter;

/**
 * @author ceanm
 *
 */
@Getter
public abstract class BaseErrorVO extends MessageVO {

	private Long timestamp;
	private Integer status;
	private String error;
	private String exception;
	private String exceptionMessage;
	private String path;

	/**
	 * @param type
	 * @param title
	 * @param message
	 * @param codeMessage
	 * @param timestamp
	 * @param status
	 * @param error
	 * @param exception
	 * @param exceptionMessage
	 * @param path
	 */
	public BaseErrorVO(MessageType type, String title, String message, String codeMessage, Long timestamp, Integer status, String error,
			String exception, String exceptionMessage, String path) {
		super(type, title, message, codeMessage);
		this.timestamp = timestamp;
		this.status = status;
		this.error = error;
		this.exception = exception;
		this.exceptionMessage = exceptionMessage;
		this.path = path;
	}

}
