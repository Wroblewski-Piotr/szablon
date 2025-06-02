package pl.eventFinder.model.modelAndRepository.event;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.eventFinder.model.modelAndRepository.domain.Organization;
import pl.eventFinder.model.modelAndRepository.domain.User;

@Entity(name = "event")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    private Organization ownerOrganization;

    @ManyToOne
    private User ownerUser;
}
