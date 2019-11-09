/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static br.com.cams7.feriasfuncionarios.model.UserEntity.WITH_CREATEDBY_LASTMODIFIEDBY;
import static br.com.cams7.feriasfuncionarios.model.UserEntity.WITH_ROLES;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Validations.EmailRegistered;
import br.com.cams7.feriasfuncionarios.common.Validations.OnCreate;
import br.com.cams7.feriasfuncionarios.common.Validations.OnUpdate;
import br.com.cams7.feriasfuncionarios.common.Views.Details;
import br.com.cams7.feriasfuncionarios.common.Views.LoggedIn;
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
@ApiModel(description = "Entidade que representa o usuário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "entityId", callSuper = false)
//@formatter:off
@NamedEntityGraphs({
	@NamedEntityGraph(name = WITH_CREATEDBY_LASTMODIFIEDBY, attributeNodes = {
		@NamedAttributeNode("createdBy"), 
		@NamedAttributeNode("lastModifiedBy")
	}),
	@NamedEntityGraph(name = WITH_ROLES, attributeNodes = { 
		@NamedAttributeNode("roles") 
	})
})
//@formatter:on
@Entity
@Table(name = "TB_USUARIO")
public class UserEntity extends Auditable<Long> {

	public static final String WITH_ROLES = "User.withRoles";
	public static final String WITH_CREATEDBY_LASTMODIFIEDBY = "User.withCreatedByAndLastModifiedBy";
	
	@ApiModelProperty(notes = "Identificador único do usuário.", example = "1", required = true, position = 5)
	@JsonView(Public.class)
	@Null(groups = OnCreate.class, message = "{User.id.null}")
	@NotNull(groups = OnUpdate.class, message = "{User.id.notNull}")
	@Id
	@SequenceGenerator(name = "SQ_USUARIO", sequenceName = "SQ_USUARIO", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_USUARIO")
	@Column(name = "ID_USUARIO", nullable = false, updatable = false)
	private Long entityId;

	@ApiModelProperty(notes = "E-mail do usuário.", example = "usuario@teste.com", required = true, position = 6)
	@JsonView(Public.class)
	@NotBlank(message = "{User.email.registered}", groups = EmailRegistered.class)
	@NotBlank(message = "{User.email.notBlank}")
	@Size(min = 3, max = 30, message = "{User.email.size}")
	@Email(message = "{User.email.email}")
	@Column(name = "EMAIL", nullable = false)
	private String email;

	@ApiModelProperty(notes = "Senha do usuário.", example = "S&nh@123", required = true, position = 7)
	@JsonView(LoggedIn.class)
	//@NotBlank
	//@Size(min = 6, max = 30)
	@Transient
	private String password;

	@JsonIgnore
	@Column(name = "SENHA", nullable = false, length = 100)
	private String encryptedPassword;

	@ApiModelProperty(notes = "Listagem com as funções (ROLES) do usuário.", required = false, position = 8)
	@JsonView(Details.class)
	@ManyToMany(fetch = LAZY)
	@JoinTable(name = "TB_USUARIO_FUNCAO", joinColumns = { @JoinColumn(name = "ID_USUARIO") }, inverseJoinColumns = {
			@JoinColumn(name = "ID_FUNCAO") })
	private Set<RoleEntity> roles;

	public UserEntity(Long id) {
		this.entityId = id;
	}

//	@ApiModelProperty(notes = "Funcionário vinculado ao usuário.", required = false, position = 8)
//	@JsonView(Views.Detail.class)
//	@LazyToOne(LazyToOneOption.NO_PROXY)
//	@OneToOne(mappedBy = "user", fetch = LAZY)
//	private EmployeeEntity Employee;

}
