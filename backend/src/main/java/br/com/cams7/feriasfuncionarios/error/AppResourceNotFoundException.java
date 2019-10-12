/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
public class AppResourceNotFoundException extends AppException {

	public AppResourceNotFoundException(String codeMessage, Object... args) {
		super(codeMessage, args);
	}

}