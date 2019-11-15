/**
 * 
 */
package br.com.cams7.cadferias.error;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
public class AppInvalidDataException extends AppException {

	public AppInvalidDataException(String codeMessage, Object... args) {
		super(codeMessage, args);
	}

}
