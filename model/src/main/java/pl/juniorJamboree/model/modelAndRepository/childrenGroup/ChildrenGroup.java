package pl.juniorJamboree.model.modelAndRepository.childrenGroup;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.juniorJamboree.model.modelAndRepository.child.Child;
import pl.juniorJamboree.model.modelAndRepository.domain.Organization;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "children_group")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChildrenGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonIgnore
    @ManyToOne
    private Organization organization;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "childrenGroup", fetch = FetchType.LAZY)
    private List<Child> children = new ArrayList<>();
}
