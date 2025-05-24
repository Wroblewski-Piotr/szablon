package pl.juniorJamboree.model.modelAndRepository.child;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.juniorJamboree.model.modelAndRepository.childrenGroup.ChildrenGroup;
import pl.juniorJamboree.model.modelAndRepository.guardian.Guardian;


@Entity(name = "child")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;

    @ManyToOne
    private ChildrenGroup childrenGroup;

    @ManyToOne
    private Guardian guardian;
}
