/**
 * 
 */
package br.com.cams7.cadferias.model.validator;

import static org.apache.commons.lang3.StringUtils.isBlank;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * @author ceanm
 *
 */
public class ImageBase64EncodingValidator implements ConstraintValidator<ImageBase64Encoding, String> {

	public final static String REGEX_IMAGE_BASE64_ENCODING_WITHOUT_CONTENT = "^data\\:image\\/(png|jpg|jpeg)\\;base64";
	public final static String REGEX_IMAGE_BASE64_ENCODING_SEPARATOR = "\\,";
	public final static String REGEX_IMAGE_BASE64_ENCODING = String.format("%s%s([A-Za-z0-9\\/\\+\\=]+)$",
			REGEX_IMAGE_BASE64_ENCODING_WITHOUT_CONTENT, REGEX_IMAGE_BASE64_ENCODING_SEPARATOR);

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (isBlank(value))
			return true;

		if (value.matches(REGEX_IMAGE_BASE64_ENCODING))
			return true;

		return false;
	}

}
