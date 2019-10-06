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
public class AppInvalidDataException extends AppException {

	public AppInvalidDataException(String codeMessage, Object... args) {
		super(codeMessage, args);
	}

}
