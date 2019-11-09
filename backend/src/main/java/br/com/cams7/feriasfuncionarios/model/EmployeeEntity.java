/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static br.com.cams7.feriasfuncionarios.model.EmployeeEntity.WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF_PHOTOS;
import static br.com.cams7.feriasfuncionarios.model.EmployeeEntity.WITH_USER_STAFF_PHOTOS;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;

import java.time.LocalDate;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Past;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Validations.OnCreate;
import br.com.cams7.feriasfuncionarios.common.Validations.OnUpdate;
import br.com.cams7.feriasfuncionarios.common.Views.Details;
import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.validator.Phone;
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
@ApiModel(description = "Entidade que representa o funcionário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "entityId", callSuper = false)
//@formatter:off
@NamedEntityGraphs({
	@NamedEntityGraph(name = WITH_USER_STAFF_PHOTOS, attributeNodes = {
		@NamedAttributeNode("user"),
		@NamedAttributeNode("staff"),
		@NamedAttributeNode("photos")
	}),
	@NamedEntityGraph(name = WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF_PHOTOS, attributeNodes = {
		@NamedAttributeNode("createdBy"), 
		@NamedAttributeNode("lastModifiedBy"), 
		@NamedAttributeNode("user"),
		@NamedAttributeNode("staff"),
		@NamedAttributeNode("photos")
	})
})
//@formatter:on
@Entity
@Table(name = "TB_FUNCIONARIO", uniqueConstraints = @UniqueConstraint(columnNames = { "ID_USUARIO", "MATRICULA" }))
public class EmployeeEntity extends Auditable<Long> {

	public static final String WITH_USER_STAFF_PHOTOS = "Employee.withUserAndStaffAndPhotos";
	public static final String WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF_PHOTOS = "Employee.withCreatedByAndLastModifiedByAndUserAndStaffAndPhotos";

	@ApiModelProperty(notes = "Identificador único do funcionário.", example = "1", required = true, position = 5)
	@JsonView(Public.class)
	@Null(groups = OnCreate.class, message = "{Employee.id.null}")
	@NotNull(groups = OnUpdate.class, message = "{Employee.id.notNull}")
	@Id
	@SequenceGenerator(name = "SQ_FUNCIONARIO", sequenceName = "SQ_FUNCIONARIO", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = SEQUENCE, generator = "SQ_FUNCIONARIO")
	@Column(name = "ID_FUNCIONARIO", nullable = false, updatable = false)
	private Long entityId;

	@ApiModelProperty(notes = "Usuário vinculado ao funcionário.", required = true, position = 6)
	@JsonView(Public.class)
	@Valid
	@NotNull(message = "{Employee.user.notNull}")
	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "ID_USUARIO")
	private UserEntity user;

	@ApiModelProperty(notes = "Equipe a qual o funcionário é membro.", required = true, position = 7)
	@JsonView(Public.class)
	@NotNull(message = "{Employee.staff.notNull}")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_EQUIPE")
	private StaffEntity staff;

	@ApiModelProperty(notes = "Data da contratação do funcionário.", example = "01/01/2019", required = true, position = 8)
	@JsonView(Public.class)
	@PastOrPresent(message = "{Employee.hiringDate.pastOrPresent}")
	@NotNull(message = "{Employee.hiringDate.notNull}")
	@Column(name = "DATA_CONTRATACAO", nullable = false)
	private LocalDate hiringDate;

	@ApiModelProperty(notes = "Matricula do funcionário.", example = "123456789abc", required = true, position = 9)
	@JsonView(Public.class)
	@Column(name = "MATRICULA", nullable = false, length = 20, updatable = false)
	private String employeeRegistration;

	@ApiModelProperty(notes = "Nome do funcionário.", example = "José Silva Pinheiro", required = true, position = 10)
	@JsonView(Public.class)
	@NotBlank(message = "{Employee.name.notBlank}")
	@Size(min = 3, max = 50, message = "{Employee.name.size}")
	@Column(name = "NOME", nullable = false)
	private String name;

	@ApiModelProperty(notes = "Data de nascimento do funcionário.", example = "08/03/1984", required = true, position = 11)
	@JsonView(Public.class)
	@Past(message = "{Employee.birthDate.past}")
	@NotNull(message = "{Employee.birthDate.notNull}")
	@Column(name = "DATA_NASCIMENTO")
	private LocalDate birthDate;

	@ApiModelProperty(notes = "Número de telefone do funcionário.", example = "3136457856", required = true, position = 12)
	@JsonView(Public.class)
	@Phone(message = "{Employee.phoneNumber.phone}")
	@NotBlank(message = "{Employee.phoneNumber.notBlank}")
	@Column(name = "TELEFONE", nullable = false)
	private String phoneNumber;

	@ApiModelProperty(notes = "Endereço do funcionário.", required = true, position = 13)
	@JsonView(Public.class)
	@Valid
	@NotNull(message = "{Employee.address.notNull}")
	@Embedded
	private Address address;

	@ApiModelProperty(notes = "Fotos do funcionário.", required = false, position = 13)
	@JsonView(Public.class)
	@Valid
	@OneToMany(mappedBy = "employee")
	private Collection<EmployeePhotoEntity> photos;

	@ApiModelProperty(notes = "Férias que pertence ao funcionário.", required = false, position = 14)
	@JsonView(Details.class)
	@OneToMany(mappedBy = "employee")
	private Collection<VacationEntity> vacations;

	public EmployeeEntity(Long id) {
		this();
		this.entityId = id;
	}

	@ApiModel(description = "Entidade que representa o endereço do funcionário.")
	@Getter
	@Setter
	@NoArgsConstructor
	@Embeddable
	public static class Address {

		@ApiModelProperty(notes = "Rua onde onde residi o funcionário.", example = "Av. Francisco Sales", required = true, position = 0)
		@JsonView(Public.class)
		@NotBlank(message = "{Employee.address.street.notBlank}")
		@Size(min = 3, max = 50, message = "{Employee.address.street.size}")
		@Column(name = "LOGRADOURO", length = 50, nullable = false)
		private String street;

		@ApiModelProperty(notes = "Número da residência do funcionário.", example = "123", required = true, position = 1)
		@JsonView(Public.class)
		@NotNull(message = "{Employee.address.houseNumber.notNull}")
		@Column(name = "NUMERO_RESIDENCIAL", nullable = false)
		private Integer houseNumber;

		@ApiModelProperty(notes = "Bairro onde onde residi o funcionário.", example = "Floresta", required = true, position = 2)
		@JsonView(Public.class)
		@NotBlank(message = "{Employee.address.neighborhood.notBlank}")
		@Size(min = 3, max = 50, message = "{Employee.address.neighborhood.size}")
		@Column(name = "BAIRRO", length = 50, nullable = false)
		private String neighborhood;

		@ApiModelProperty(notes = "Cidade onde onde residi o funcionário.", example = "Belo Horizonte", required = true, position = 3)
		@JsonView(Public.class)
		@NotBlank(message = "{Employee.address.city.notBlank}")
		@Size(min = 3, max = 30, message = "{Employee.address.city.size}")
		@Column(name = "CIDADE", length = 30, nullable = false)
		private String city;

		@ApiModelProperty(notes = "Estado onde onde residi o funcionário.", example = "MG", required = true, position = 4)
		@JsonView(Public.class)
		@NotNull(message = "{Employee.address.state.notNull}")
		@Column(name = "UF", nullable = false, columnDefinition = "CHAR(2)")
		@Enumerated(STRING)
		private State state;

		@Getter
		public static enum State {
			// @formatter:off
			AC("Acre"), 
			AL("Alagoas"), 
			AM("Amazonas"), 
			AP("Amapá"), 
			BA("Bahia"), 
			CE("Ceará"), 
			DF("Distrito Federal"),
			ES("Espírito Santo"), 
			GO("Goiás"), 
			MA("Maranhão"), 
			MG("Minas Gerais"), 
			MS("Mato Grosso do Sul"),
			MT("Mato Grosso"), 
			PA("Pará"), 
			PB("Paraíba"), 
			PE("Pernambuco"), 
			PI("Piauí"), 
			PR("Paraná"),
			RJ("Rio de Janeiro"), 
			RN("Rio Grande do Norte"), 
			RO("Rondônia"), 
			RR("Roraima"), 
			RS("Rio Grande do Sul"),
			SC("Santa Catarina"), 
			SE("Sergipe"), 
			SP("São Paulo"), 
			TO("Tocantins");
			// @formatter:on

			private String name;

			private State(String name) {
				this.name = name;
			}

		}
	}

}
