/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author ceanm
 *
 */
@Getter
@Setter
@AllArgsConstructor
@ToString
public class CreationAuditableVO {

	private Long createdBy;
	private LocalDateTime createdDate;
}
