/**
 * 
 */
package br.com.cams7.cadferias.error.vo;

import lombok.Builder;

/**
 * @author ceanm
 *
 */
public class ErrorVO extends BaseErrorVO {

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
	@Builder
	protected ErrorVO(MessageType type, String title, String message, String codeMessage, Long timestamp, Integer status, String error,
			String exception, String exceptionMessage, String path) {
		super(type, title, message, codeMessage, timestamp, status, error, exception, exceptionMessage, path);
	}

}
