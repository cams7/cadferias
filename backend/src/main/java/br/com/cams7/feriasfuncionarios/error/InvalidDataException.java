/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@ResponseStatus(BAD_REQUEST)
public class InvalidDataException extends RuntimeException {

	public InvalidDataException(String message) {
		super(message);
	}

}
