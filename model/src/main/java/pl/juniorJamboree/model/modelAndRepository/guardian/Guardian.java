package pl.juniorJamboree.model.modelAndRepository.guardian;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.juniorJamboree.model.modelAndRepository.child.Child;

import jakarta.persistence.*;
import java.util.List;

@Entity(name = "parent")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Guardian {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REFRESH, mappedBy = "guardian", fetch = FetchType.LAZY)
    private List<Child> childrenUnderSupervision;
}
