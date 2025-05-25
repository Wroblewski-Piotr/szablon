package pl.szablon.model.modelAndRepository.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.szablon.commons.enums.RoleEnum;

import jakarta.persistence.*;

@Entity(name = "user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    private String email;
    private RoleEnum role;

    @JsonIgnore
    private String password;

    @JsonIgnore
    @ManyToOne
    private Organization organization;

}
