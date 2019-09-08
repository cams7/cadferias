/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static javax.persistence.GenerationType.SEQUENCE;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author ceanm
 *
 */
@ApiModel(description = "Entidade que representa a equipe.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
//@formatter:off
@NamedEntityGraph(name = StaffEntity.WITH_CREATEDBY_LASTMODIFIEDBY, attributeNodes = {
	@NamedAttributeNode("createdBy"), 
	@NamedAttributeNode("lastModifiedBy")
})
//@formatter:on
@Entity
@Table(name = "TB_EQUIPE")
public class StaffEntity extends Auditable<Long> {
	
	public static final String WITH_CREATEDBY_LASTMODIFIEDBY = "Staff.withCreatedByAndLastModifiedBy";

	@ApiModelProperty(notes = "Identificador único da equipe.", example = "1", required = true, position = 5)
	@JsonView(Views.Public.class)
	@Id
	@SequenceGenerator(name = "SQ_EQUIPE", sequenceName = "SQ_EQUIPE", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_EQUIPE")
	@Column(name = "ID_EQUIPE", nullable = false)
	private Long id;

	@ApiModelProperty(notes = "Nome da equipe.", example = "Equipe 1", required = true, position = 6)
	@JsonView(Views.Public.class)
	@NotBlank
	@Size(min = 3, max = 30)
	@Column(name = "NOME")
	private String name;

	@ApiModelProperty(notes = "Funcionários que pertence a equipe.", required = false, position = 7)
	@JsonView(Views.Details.class)
	@OneToMany(mappedBy = "staff")
	private Collection<EmployeeEntity> employees;

}
