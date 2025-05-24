package pl.juniorJamboree.model.modelAndRepository.childrenGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildrenGroupRepository extends JpaRepository<ChildrenGroup, Long> {

}
