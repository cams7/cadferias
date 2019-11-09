/**
 * 
 */
package br.com.cams7.feriasfuncionarios.common;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import br.com.cams7.feriasfuncionarios.error.AppException;

/**
 * @author ceanm
 *
 */
public abstract class Base {

	@Autowired
	private MessageSource messageSource;

	protected final String getMessage(String codeMessage, Object... args) {
		return Utils.getMessage(messageSource, codeMessage, args);
	}

	protected abstract int getIdIndex();

	protected abstract int getEntityIndex();

	protected abstract int getFilterIndex();

	protected Class<?> getIdType() {
		return getTypeFromTemplate(getIdIndex());
	}

	protected Class<?> getEntityType() {
		return getTypeFromTemplate(getEntityIndex());
	}

	protected Class<?> getFilterType() {
		return getTypeFromTemplate(getFilterIndex());
	}

	protected Class<?> getTypeFromTemplate(int index) {
		return getTypeFromTemplate(getClass(), index);
	}

	protected Class<?> getTypeFromTemplate(Class<?> type, int index) {
		return (Class<?>) ((ParameterizedType) type.getGenericSuperclass()).getActualTypeArguments()[index];
	}

	protected Serializable getId(String id) {
		try {
			@SuppressWarnings("unchecked")
			Serializable entityId = ((Constructor<Serializable>) getIdType().getConstructor(String.class))
					.newInstance(new Object[] { id });
			return entityId;
		} catch (NoSuchMethodException | SecurityException | InstantiationException | IllegalAccessException
				| IllegalArgumentException | InvocationTargetException e) {
			throw new AppException(e.getMessage(), e);
		}
	}
}
