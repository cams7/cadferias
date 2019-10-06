/**
 * 
 */
package br.com.cams7.feriasfuncionarios.common;

import java.util.Locale;

import org.springframework.context.MessageSource;

/**
 * @author ceanm
 *
 */
public class Utils {
	private static final Locale LOCALE = new Locale("pt", "BR");
	
	private static final String EMPTY = "";
	private static final String ENTITY_SUFFIX = "Entity";

	public static String getEntityName(String entityName) {
		return getValueWithoutEntitySuffix(getFirstCharacterLower(entityName));
	}

	private static String getFirstCharacterLower(String value) {
		return value.substring(0, 1).toLowerCase() + value.substring(1);
	}

	public static String getValueWithoutEntitySuffix(String value) {
		return value.replaceFirst(ENTITY_SUFFIX, EMPTY);
	}
	
	public static String getMessage(MessageSource messageSource, String code, Object... args) {
		return messageSource.getMessage(code, args, LOCALE);
	}
}
