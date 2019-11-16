/**
 * 
 */
package br.com.cams7.cadferias.model;

import static javax.persistence.FetchType.LAZY;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.cadferias.common.Views.Details;
import br.com.cams7.cadferias.common.Views.Public;
import br.com.cams7.cadferias.model.common.BaseEntity;
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
@ApiModel(description = "Entidade que representa a funcionalidade (ROLE).")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = { "entityId", "name" }, callSuper = false)
@Entity
@Table(name = "TB_FUNCIONALIDADE", uniqueConstraints = { @UniqueConstraint(columnNames = { "nome" }) })
public class RoleEntity extends BaseEntity<Long> {

	public static final String PREFIX_ROLE = "ROLE_";
	public static final String ROLE_LIST_ALL_STAFFS = "ROLE_LIST_ALL_STAFFS";
	public static final String ROLE_REGISTER_NEW_STAFF = "ROLE_REGISTER_NEW_STAFF";
	public static final String ROLE_VIEW_STAFF_DETAILS = "ROLE_VIEW_STAFF_DETAILS";
	public static final String ROLE_UPDATE_STAFF_DATA = "ROLE_UPDATE_STAFF_DATA";
	public static final String ROLE_DELETE_STAFF = "ROLE_DELETE_STAFF";
	public static final String ROLE_LIST_ALL_EMPLOYEES = "ROLE_LIST_ALL_EMPLOYEES";
	public static final String ROLE_REGISTER_NEW_EMPLOYEE = "ROLE_REGISTER_NEW_EMPLOYEE";
	public static final String ROLE_VIEW_EMPLOYEE_DETAILS = "ROLE_VIEW_EMPLOYEE_DETAILS";
	public static final String ROLE_UPDATE_EMPLOYEE_DATA = "ROLE_UPDATE_EMPLOYEE_DATA";
	public static final String ROLE_DELETE_EMPLOYEE = "ROLE_DELETE_EMPLOYEE";
	public static final String ROLE_LIST_ALL_VACATIONS = "ROLE_LIST_ALL_VACATIONS";
	public static final String ROLE_REGISTER_NEW_VACATION = "ROLE_REGISTER_NEW_VACATION";
	public static final String ROLE_VIEW_VACATION_DETAILS = "ROLE_VIEW_VACATION_DETAILS";
	public static final String ROLE_UPDATE_VACATION_DATA = "ROLE_UPDATE_VACATION_DATA";
	public static final String ROLE_DELETE_VACATION = "ROLE_DELETE_VACATION";

	@ApiModelProperty(notes = "Identificador unico da funcionalidade (ROLE).", example = "1", required = true, position = 0)
	@JsonView(Public.class)
	@Id
	@SequenceGenerator(name = "SQ_FUNCIONALIDADE", sequenceName = "SQ_FUNCIONALIDADE", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_FUNCIONALIDADE")
	@Column(name = "ID_FUNCIONALIDADE")
	private Long entityId;

	@ApiModelProperty(notes = "Nome da funcionalidade (ROLE).", example = "ROLE_LIST_ALL_STAFFS", required = true, position = 1)
	@JsonView(Public.class)
	@Column(name = "NOME", length = 50, nullable = false)
	private String name;

	@ApiModelProperty(notes = "Descrição da funcionalidade.", example = "Listar todas equipes", required = true, position = 2)
	@JsonView(Public.class)
	@Column(name = "DESCRICAO", length = 100)
	private String description;

	@ApiModelProperty(notes = "Listagem com os usuários que tem essa funcionalides (ROLES).", required = false, position = 3)
	@JsonView(Details.class)
	@ManyToMany(mappedBy = "roles", fetch = LAZY)
	private Set<UserEntity> users;

}
