package pl.szablon.model.modelAndRepository.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import pl.szablon.commons.enums.OrganizationTypeEnum;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "organization")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private OrganizationTypeEnum organizationType;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "organization", fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();
}
