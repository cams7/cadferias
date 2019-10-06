/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@ResponseStatus(NOT_FOUND)
public class AppResourceNotFoundException extends AppException {

	public AppResourceNotFoundException(String codeMessage, Object... args) {
		super(codeMessage, args);
	}

}