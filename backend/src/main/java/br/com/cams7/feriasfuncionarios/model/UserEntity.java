/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static javax.persistence.GenerationType.SEQUENCE;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Email;
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
@ApiModel(description = "Entidade que representa o usuário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
//@formatter:off
@NamedEntityGraph(name = UserEntity.WITH_CREATEDBY_LASTMODIFIEDBY, attributeNodes = {
	@NamedAttributeNode("createdBy"), 
	@NamedAttributeNode("lastModifiedBy")
})
//@formatter:on
@Entity
@Table(name = "TB_USUARIO")
public class UserEntity extends Auditable<Long> {
	
	public static final String WITH_CREATEDBY_LASTMODIFIEDBY = "User.withCreatedByAndLastModifiedBy";

	@ApiModelProperty(notes = "Identificador único do usuário.", example = "1", required = true, position = 5)
	@JsonView(Views.Public.class)
	@Id
	@SequenceGenerator(name = "SQ_USUARIO", sequenceName = "SQ_USUARIO", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_USUARIO")
	@Column(name = "ID_USUARIO", nullable = false)
	private Long id;

	@ApiModelProperty(notes = "E-mail do usuário.", example = "usuario@teste.com", required = true, position = 6)
	@JsonView(Views.Public.class)
	@NotBlank
	@Size(min = 3, max = 30)
	@Email
	@Column(name = "EMAIL")
	private String email;

	@ApiModelProperty(notes = "Senha do usuário.", example = "S&nh@123", required = true, position = 7)
	@JsonView(Views.Public.class)
	@NotBlank
	@Size(min = 3, max = 30)
	@Column(name = "SENHA")
	private String password;

	public UserEntity(Long id) {
		this.id = id;
	}

//	@ApiModelProperty(notes = "Funcionário vinculado ao usuário.", required = false, position = 8)
//	@JsonView(Views.Detail.class)
//	@LazyToOne(LazyToOneOption.NO_PROXY)
//	@OneToOne(mappedBy = "user", fetch = LAZY)
//	private EmployeeEntity Employee;
	
	

}
