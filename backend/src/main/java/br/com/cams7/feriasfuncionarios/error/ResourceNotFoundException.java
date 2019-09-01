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
public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String message) {
		super(message);
	}
}
