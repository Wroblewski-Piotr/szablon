package pl.juniorJamboree.webService.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.juniorJamboree.model.modelAndRepository.childrenGroup.ChildrenGroup;
import pl.juniorJamboree.model.modelAndRepository.childrenGroup.ChildrenGroupRepository;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class ChildrenGroupService {
    private final ChildrenGroupRepository childrenGroupRepository;

    public List<ChildrenGroup> getChildrenGroups() {
        return null;
    }
}
