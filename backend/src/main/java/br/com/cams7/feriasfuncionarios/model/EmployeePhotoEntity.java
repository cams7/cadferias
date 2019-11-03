/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model;

import static javax.persistence.FetchType.LAZY;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Image.ImageType;
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
@ApiModel(description = "Entidade que representa os dados da foto do funcionário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
@Table(name = "TB_FOTO_FUNCIONARIO")
public class EmployeePhotoEntity extends BaseEntity<Long> {

	@ApiModelProperty(notes = "Identificador unico da foto do funcionário.", example = "1", required = true, position = 0)
	@JsonView(Public.class)
	@Id
	@SequenceGenerator(name = "SQ_FOTO_FUNCIONARIO", sequenceName = "SQ_FOTO_FUNCIONARIO", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_FOTO_FUNCIONARIO")
	@Column(name = "ID_FOTO_FUNCIONARIO")
	private Long id;

	@ApiModelProperty(notes = "Extensão da imagem.", example = "JPEG", required = true, position = 1)
	@JsonView(Public.class)
	@NotNull(message = "{EmployeePhoto.imageType.notNull}")
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "EXTENSAO_IMAGEM")
	private ImageType imageType;

	@ApiModelProperty(notes = "Foto do funcionário.", required = false, position = 2)
	@JsonView(Public.class)
	@NotNull(message = "{EmployeePhoto.photo.notEmpty}")
	@NotEmpty(message = "{EmployeePhoto.photo.notEmpty}")
	@Basic(fetch = LAZY)
	@Lob
	@Column(name = "FOTO_FUNCIONARIO")
	private byte[] photo;

	@JsonIgnore
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_FUNCIONARIO", nullable = false)
	private EmployeeEntity employee;

}
