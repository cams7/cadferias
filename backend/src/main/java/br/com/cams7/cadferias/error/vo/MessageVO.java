/**
 * 
 */
package br.com.cams7.cadferias.error.vo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author ceanm
 *
 */
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class MessageVO {

	private MessageType type;
	private String title;
	private String message;
	private String codeMessage;

	public static enum MessageType {
		SUCCESS, INFO, WARNING, DANGER
	}

}
