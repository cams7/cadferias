/**
 * 
 */
package br.com.cams7.feriasfuncionarios.error;

import static br.com.cams7.feriasfuncionarios.error.vo.MessageVO.MessageType.WARNING;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.time.Instant;
import java.util.Arrays;

import javax.validation.ConstraintViolationException;

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
	private static final String NOTFOUND_ERROR = "Resource not found";
	private static final String INVALIDDATA_ERROR = "Invalid data";
	private static final String FIELD_VALIDATION_ERROR = "Field validation error";

	@Autowired
	private MessageSource messageSource;

	@ExceptionHandler(AppResourceNotFoundException.class)
	public ResponseEntity<ErrorVO> handleResourceNotFoundException(AppResourceNotFoundException exception) {

		String message = getMessage(exception);

		// @formatter:off
		ErrorVO details = ErrorVO.builder()
				.type(WARNING)
				.title(NOTFOUND_ERROR)
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
				.title(INVALIDDATA_ERROR)
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

	@ExceptionHandler(AppFieldErrorException.class)
	public ResponseEntity<?> handleFieldValidationErrorException(AppFieldErrorException exception) {

		FieldErrorVO error = exception.getError();
		String objectName =  getObjectNameWithPrefix(exception.getPrefix(), error.getObjectName());
		
		error.setObjectName(objectName);
		error.setField(getFieldWithObjectName(objectName, error.getField()));
		
		// @formatter:off
		FieldValidationErrorVO details = FieldValidationErrorVO.builder()
				.type(WARNING)
				.title(FIELD_VALIDATION_ERROR)
				.message(exception.getMessage())
				.codeMessage(null)
				.timestamp(Instant.now().toEpochMilli())
				.status(BAD_REQUEST.value())
				.error(BAD_REQUEST.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(exception.getMessage())
				.path(null)
				.errors(new FieldErrorVO[] {error}).build();
		//@formatter:on
		return ResponseEntity.badRequest().body(details);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleFieldValidationErrorException(ConstraintViolationException exception) {

		// @formatter:off
		FieldValidationErrorVO details = FieldValidationErrorVO.builder()
				.type(WARNING)
				.title(FIELD_VALIDATION_ERROR)
				.message(exception.getMessage())
				.codeMessage(null)
				.timestamp(Instant.now().toEpochMilli())
				.status(BAD_REQUEST.value())
				.error(BAD_REQUEST.name())
				.exception(exception.getClass().getName())
				.exceptionMessage(exception.getMessage())
				.path(null)
				.errors(exception.getConstraintViolations().stream().map(violation -> {
					return FieldErrorVO.builder()
							.codes(null)
							.arguments(null)
							.defaultMessage(violation.getMessage())
							.objectName(Utils.getEntityName(violation.getLeafBean().getClass().getSimpleName()))
							.field(getField(violation.getPropertyPath().toString()))
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
				.title(FIELD_VALIDATION_ERROR)
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
		return Utils.getMessage(messageSource, exception.getCodeMessage(), exception.getArgs());
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
