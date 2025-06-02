package pl.eventFinder.model.modelAndRepository.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import pl.eventFinder.commons.enums.OrganizationTypeEnum;
import pl.eventFinder.model.modelAndRepository.event.Event;

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

    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "organization", fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH},
            mappedBy = "ownerOrganization",
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<Event> events = new ArrayList<>();
}
