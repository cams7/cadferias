/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.cams7.feriasfuncionarios.error.vo.FieldValidationErrorVO.FieldErrorVO;
import lombok.Getter;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
@ResponseStatus(BAD_REQUEST)
@Getter
public class AppFieldErrorException extends RuntimeException {

	private String prefix;
	private FieldErrorVO error;

	public AppFieldErrorException(String prefix, FieldErrorVO error) {
		super(error.getDefaultMessage());
		this.prefix = prefix;
		this.error = error;
	}

}
