package pl.eventFinder.model.modelAndRepository.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.eventFinder.commons.enums.RoleEnum;

import jakarta.persistence.*;
import pl.eventFinder.model.modelAndRepository.event.Event;

import java.util.ArrayList;
import java.util.List;

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

    private String password;

    @ManyToOne
    private Organization organization;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH},
            mappedBy = "ownerUser",
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<Event> events = new ArrayList<>();

}
