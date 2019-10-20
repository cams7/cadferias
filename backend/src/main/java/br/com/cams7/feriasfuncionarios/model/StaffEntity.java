/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static br.com.cams7.feriasfuncionarios.model.StaffEntity.WITH_CREATEDBY_LASTMODIFIEDBY;
import static javax.persistence.GenerationType.SEQUENCE;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Validations.OnCreate;
import br.com.cams7.feriasfuncionarios.common.Validations.OnUpdate;
import br.com.cams7.feriasfuncionarios.common.Views.Details;
import br.com.cams7.feriasfuncionarios.common.Views.Public;
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
@NamedEntityGraphs({
	@NamedEntityGraph(name = WITH_CREATEDBY_LASTMODIFIEDBY, attributeNodes = {
		@NamedAttributeNode("createdBy"), 
		@NamedAttributeNode("lastModifiedBy")
	})
})
//@formatter:on
@Entity
@Table(name = "TB_EQUIPE")
public class StaffEntity extends Auditable<Long> {

	public static final String WITH_CREATEDBY_LASTMODIFIEDBY = "Staff.withCreatedByAndLastModifiedBy";

	@ApiModelProperty(notes = "Identificador único da equipe.", example = "1", required = true, position = 5)
	@JsonView(Public.class)
	@Null(groups = OnCreate.class, message = "{Staff.id.null}")
	@NotNull(groups = OnUpdate.class, message = "{Staff.id.notNull}")
	@Id
	@SequenceGenerator(name = "SQ_EQUIPE", sequenceName = "SQ_EQUIPE", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_EQUIPE")
	@Column(name = "ID_EQUIPE", nullable = false, updatable = false)
	private Long id;

	@ApiModelProperty(notes = "Nome da equipe.", example = "Equipe 1", required = true, position = 6)
	@JsonView(Public.class)
	@NotBlank(message = "{Staff.name.notBlank}")
	@Size(min = 3, max = 30, message = "{Staff.name.size}")
	@Column(name = "NOME", nullable = false)
	private String name;

	@ApiModelProperty(notes = "Funcionários que pertence a equipe.", required = false, position = 7)
	@JsonView(Details.class)
	@OneToMany(mappedBy = "staff")
	private Collection<EmployeeEntity> employees;

}
