/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static br.com.cams7.feriasfuncionarios.error.vo.MessageVO.MessageType.WARNING;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.time.Instant;
import java.util.Arrays;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.cams7.feriasfuncionarios.common.Utils;
import br.com.cams7.feriasfuncionarios.error.vo.ConstraintViolationWithPrefixVO;
import br.com.cams7.feriasfuncionarios.error.vo.ErrorVO;
import br.com.cams7.feriasfuncionarios.error.vo.FieldValidationErrorVO;
import br.com.cams7.feriasfuncionarios.error.vo.FieldValidationErrorVO.ArgumentErrorVO;
import br.com.cams7.feriasfuncionarios.error.vo.FieldValidationErrorVO.FieldErrorVO;

/**
 * @author ceanm
 *
 */
@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageSource messageSource;

	@ExceptionHandler(AppResourceNotFoundException.class)
	public ResponseEntity<ErrorVO> handleResourceNotFoundException(AppResourceNotFoundException exception) {

		String message = getMessage(exception);

		// @formatter:off
		ErrorVO details = ErrorVO.builder()
				.type(WARNING)
				.title(getMessage("notFound"))
				.message(message)
				.codeMessage(exception.getCodeMessage())
				.timestamp(Instant.now().toEpochMilli())
				.status(NOT_FOUND.value())
				.error(NOT_FOUND.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(message)
				.path(null)
				.build();
		//@formatter:on
		return new ResponseEntity<>(details, NOT_FOUND);
	}

	@ExceptionHandler(AppInvalidDataException.class)
	public ResponseEntity<?> handleInvalidDataException(AppInvalidDataException exception) {

		String message = getMessage(exception);

		// @formatter:off
		ErrorVO details = ErrorVO.builder()
				.type(WARNING)
				.title(getMessage("invalidData"))
				.message(message)
				.codeMessage(exception.getCodeMessage())
				.timestamp(Instant.now().toEpochMilli())
				.status(BAD_REQUEST.value())
				.error(BAD_REQUEST.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(message)
				.path(null)
				.build();
		//@formatter:on
		return new ResponseEntity<>(details, BAD_REQUEST);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleFieldValidationErrorException(ConstraintViolationException exception) {

		// @formatter:off
		FieldValidationErrorVO details = FieldValidationErrorVO.builder()
				.type(WARNING)
				.title(getMessage("invalidField"))
				.message(exception.getMessage())
				.codeMessage(null)
				.timestamp(Instant.now().toEpochMilli())
				.status(BAD_REQUEST.value())
				.error(BAD_REQUEST.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(exception.getMessage())
				.path(null)
				.errors(exception.getConstraintViolations().stream().map(violation -> {
					String objectName = getObjectName(violation);
						
					return FieldErrorVO.builder()
							.codes(null)
							.arguments(null)
							.defaultMessage(violation.getMessage())
							.objectName(objectName)
							.field(getFieldWithObjectName(objectName, getField(violation.getPropertyPath().toString())))
							.rejectedValue(violation.getInvalidValue())
							.bindingFailure(false)
							.code(null)
							.build();
				}).toArray(FieldErrorVO[]::new)).build();
		//@formatter:on
		return ResponseEntity.badRequest().body(details);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		// @formatter:off
		FieldValidationErrorVO details = FieldValidationErrorVO.builder()
				.type(WARNING)
				.title(getMessage("invalidField"))
				.message(exception.getLocalizedMessage())
				.codeMessage(null)
				.timestamp(Instant.now().toEpochMilli())
				.status(status.value())
				.error(status.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(exception.getMessage())
				.path(null)
				.errors(exception.getBindingResult().getFieldErrors().stream().map(error -> {
					return FieldErrorVO.builder()
							.codes(getCodes(error.getCodes()))
							.arguments(getArguments(error.getArguments()))
							.defaultMessage(error.getDefaultMessage())
							.objectName(Utils.getValueWithoutEntitySuffix(error.getObjectName()))
							.field(error.getField())
							.rejectedValue(error.getRejectedValue())
							.bindingFailure(error.isBindingFailure())
							.code(error.getCode())
							.build();
				}).toArray(FieldErrorVO[]::new)).build();
		//@formatter:on
		return ResponseEntity.badRequest().body(details);
	}

	private final String getMessage(AppException exception) {
		return getMessage(exception.getCodeMessage(), exception.getArgs());
	}

	private final String getMessage(String codeMessage, Object... args) {
		return Utils.getMessage(messageSource, codeMessage, args);
	}

	private static String getObjectName(ConstraintViolation<?> violation) {
		if (violation instanceof ConstraintViolationWithPrefixVO) {
			String prefix = ((ConstraintViolationWithPrefixVO<?>) violation).getPrefix();
			if (StringUtils.isNotBlank(prefix))
				return getObjectNameWithPrefix(prefix, Utils.getEntityName(getEntityType(violation).getSimpleName()));
		}

		return Utils.getEntityName(getEntityType(violation).getSimpleName());

	}

	private static Class<?> getEntityType(ConstraintViolation<?> violation) {
		if (violation.getLeafBean() != null)
			return violation.getLeafBean().getClass();

		return violation.getRootBeanClass();
	}

	private static String getObjectNameWithPrefix(String prefix, String entityName) {
		return (prefix != null ? prefix : "") + entityName;
	}

	private static String getFieldWithObjectName(String objectName, String field) {
		int index = objectName.indexOf(".");
		return (index > 0 ? objectName.substring(index + 1) + "." : "") + getField(field);
	}

	private static String getField(String path) {
		String[] array = path.split("\\.");
		return array[array.length - 1];
	}

	private static Object[] getArguments(Object[] arguments) {
		return Arrays.asList(arguments).stream().map(argument -> {
			if (argument instanceof DefaultMessageSourceResolvable) {
				DefaultMessageSourceResolvable dmsr = (DefaultMessageSourceResolvable) argument;
				ArgumentErrorVO error = new ArgumentErrorVO();
				error.setCodes(getCodes(dmsr.getCodes()));
				error.setCode(dmsr.getCode());
				error.setDefaultMessage(dmsr.getDefaultMessage());
				if (dmsr.getArguments() != null && dmsr.getArguments().length > 0)
					error.setArguments(getArguments(dmsr.getArguments()));

				return error;
			}

			return argument;
		}).toArray(Object[]::new);
	}

	private static String[] getCodes(String[] codes) {
		return Arrays.asList(codes).stream().map(code -> Utils.getValueWithoutEntitySuffix(code))
				.toArray(String[]::new);
	}

}
