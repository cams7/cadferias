/**
 * 
 */
package br.com.cams7.cadferias.error.vo;

import javax.validation.ConstraintViolation;
import javax.validation.Path;
import javax.validation.metadata.ConstraintDescriptor;

import br.com.cams7.cadferias.model.common.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author ceanm
 *
 */
@NoArgsConstructor
@Getter
public class ConstraintViolationWithPrefixVO<E extends Auditable<?>> implements ConstraintViolation<E> {

	private String prefix;

	private String message;
	private String messageTemplate;
	private E rootBean;
	private Class<E> rootBeanClass;
	private Object leafBean;
	private Object[] executableParameters;
	private Object executableReturnValue;
	private Path propertyPath;
	private Object invalidValue;
	private ConstraintDescriptor<?> constraintDescriptor;

	public ConstraintViolationWithPrefixVO(String prefix, ConstraintViolation<E> constraintViolation) {
		this.prefix = prefix;
		this.message = constraintViolation.getMessage();
		this.messageTemplate = constraintViolation.getMessageTemplate();
		this.rootBean = constraintViolation.getRootBean();
		this.rootBeanClass = constraintViolation.getRootBeanClass();
		this.leafBean = constraintViolation.getLeafBean();
		this.executableParameters = constraintViolation.getExecutableParameters();
		this.executableReturnValue = constraintViolation.getExecutableReturnValue();
		this.propertyPath = constraintViolation.getPropertyPath();
		this.invalidValue = constraintViolation.getInvalidValue();
		this.constraintDescriptor = constraintViolation.getConstraintDescriptor();
	}

	@Override
	public <U> U unwrap(Class<U> type) {
		return null;
	}

}
