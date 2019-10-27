/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * @author ceanm
 *
 */
@Documented
@Constraint(validatedBy = ImageBase64EncodingValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ImageBase64Encoding {
	
	String message() default "{ImageBase64Encoding.message}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
