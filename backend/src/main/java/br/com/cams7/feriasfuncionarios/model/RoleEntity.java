/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static javax.persistence.FetchType.LAZY;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.model.common.BaseEntity;
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
@ApiModel(description = "Entidade que representa a função (ROLE).")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
@Table(name = "TB_FUNCAO", uniqueConstraints = { @UniqueConstraint(columnNames = { "nome" }) })
public class RoleEntity extends BaseEntity<Long> {

	@ApiModelProperty(notes = "Identificador unico da função (ROLE).", example = "1", required = true, position = 0)
	@JsonView(Public.class)
	@Id
	@SequenceGenerator(name = "sq_funcao", sequenceName = "sq_funcao", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_funcao")
	@Column(name = "ID_FUNCAO")
	private Long id;

	@ApiModelProperty(notes = "Nome da função (ROLE).", example = "ROLE_USER", required = true, position = 1)
	@JsonView(Public.class)
	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(name = "NOME", length = 30)
	private RoleName name;

	@ApiModelProperty(notes = "Listagem com os usuários que tem essa função (ROLE).", required = false, position = 2)
	@JsonView(Public.class)
	@ManyToMany(mappedBy = "roles", fetch = LAZY)
	private Set<UserEntity> users;

	public static enum RoleName {
		ROLE_USER, ROLE_ADMIN
	}
}
