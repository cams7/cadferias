/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static br.com.cams7.feriasfuncionarios.model.VacationEntity.WITH_CREATEDBY_LASTMODIFIEDBY_EMPLOYEE;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.NamedSubgraph;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Validations.OnCreate;
import br.com.cams7.feriasfuncionarios.common.Validations.OnUpdate;
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
@ApiModel(description = "Entidade que representa a férias do funcionário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
//@formatter:off
@NamedEntityGraphs({
	@NamedEntityGraph(name = WITH_CREATEDBY_LASTMODIFIEDBY_EMPLOYEE, attributeNodes = {
		@NamedAttributeNode("createdBy"), 
		@NamedAttributeNode("lastModifiedBy"),
		@NamedAttributeNode(value = "employee", subgraph = "employee")
	}, subgraphs = @NamedSubgraph(name = "employee", attributeNodes = {
		@NamedAttributeNode(value = "user"),
		@NamedAttributeNode(value = "staff")
	}))
})
//@formatter:on
@Entity
@Table(name = "TB_FERIAS")
public class VacationEntity extends Auditable<Long> {

	public static final String WITH_CREATEDBY_LASTMODIFIEDBY_EMPLOYEE = "Vacation.withCreatedByAndLastModifiedByAndEmployee";

	@ApiModelProperty(notes = "Identificador único da férias.", example = "1", required = true, position = 5)
	@JsonView(Public.class)
	@Null(groups = OnCreate.class, message = "{Vacation.id.null}")
	@NotNull(groups = OnUpdate.class, message = "{Vacation.id.notNull}")
	@Id
	@SequenceGenerator(name = "SQ_FERIAS", sequenceName = "SQ_FERIAS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_FERIAS")
	@Column(name = "ID_FERIAS", nullable = false, updatable = false)
	private Long id;

	@ApiModelProperty(notes = "Funcionário do qual pertence a férias.", required = true, position = 6)
	@JsonView(Public.class)
	@NotNull(message = "{Vacation.employee.notNull}")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_FUNCIONARIO")
	private EmployeeEntity employee;

	@ApiModelProperty(notes = "Data inicial da férias.", example = "05/06/2019", required = true, position = 7)
	@JsonView(Public.class)
	@Future(message = "{Vacation.startDate.future}")
	@NotNull(message = "{Vacation.startDate.notNull}")
	@Column(name = "DATA_INICIAL")
	private LocalDate startDate;

	@ApiModelProperty(notes = "Data final da férias.", example = "06/06/2019", required = true, position = 8)
	@JsonView(Public.class)
	@Future(message = "{Vacation.endDate.future}")
	@NotNull(message = "{Vacation.endDate.notNull}")
	@Column(name = "DATA_FINAL")
	private LocalDate endDate;
}
