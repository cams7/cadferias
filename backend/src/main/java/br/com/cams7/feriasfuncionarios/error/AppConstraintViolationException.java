/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@Getter
@ResponseStatus(BAD_REQUEST)
public class AppConstraintViolationException extends ConstraintViolationException {
	private String prefix;

	public AppConstraintViolationException(String prefix, Set<? extends ConstraintViolation<?>> constraintViolations) {
		super(constraintViolations);
		this.prefix = prefix;
	}

}
