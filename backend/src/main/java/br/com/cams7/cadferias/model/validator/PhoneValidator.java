package br.com.cams7.cadferias.model.validator;

import static org.apache.commons.lang3.StringUtils.isBlank;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * @author ceanm
 *
 */
public class PhoneValidator implements ConstraintValidator<Phone, String> {
	
	public final static String REGEX_PHONE = "\\d{10,11}";

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (isBlank(value))
			return true;

		if (value.matches(REGEX_PHONE))
			return true;

		return false;
	}

}
