/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error.vo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ceanm
 *
 */
@Getter
public class FieldValidationErrorVO extends BaseErrorVO {

	private FieldErrorVO[] errors;

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
	 * @param errors
	 */
	@Builder
	protected FieldValidationErrorVO(MessageType type, String title, String message, String codeMessage, Long timestamp, Integer status,
			String error, String exception, String exceptionMessage, String path, FieldErrorVO[] errors) {
		super(type, title, message, codeMessage, timestamp, status, error, exception, exceptionMessage, path);
		this.errors = errors;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class FieldErrorVO extends ArgumentErrorVO {

		private String objectName;
		private String field;
		private Object rejectedValue;
		private boolean bindingFailure;

		/**
		 * @param codes
		 * @param arguments
		 * @param defaultMessage
		 * @param code
		 * @param objectName
		 * @param field
		 * @param rejectedValue
		 * @param bindingFailure
		 */
		@Builder
		protected FieldErrorVO(String[] codes, Object arguments, String defaultMessage, String code, String objectName,
				String field, Object rejectedValue, boolean bindingFailure) {
			super(codes, arguments, defaultMessage, code);
			this.objectName = objectName;
			this.field = field;
			this.rejectedValue = rejectedValue;
			this.bindingFailure = bindingFailure;
		}

	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor(access = AccessLevel.PUBLIC)
	public static class ArgumentErrorVO {
		private String[] codes;
		private Object arguments;// ArgumentErrorVO, Integer
		private String defaultMessage;
		private String code;
	}
}
