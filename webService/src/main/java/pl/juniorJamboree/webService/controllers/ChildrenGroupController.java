package pl.juniorJamboree.webService.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.juniorJamboree.webService.transportModel.ChildrenGroupMT;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Controller
@RestController
@RequestMapping("/api/v1/groups")
@RequiredArgsConstructor
public class ChildrenGroupController {

    @GetMapping
    @PreAuthorize("hasAnyAuthority('TEST_PRIVILAGE_1')")
    public ResponseEntity<List<ChildrenGroupMT>> getChildrenGroups(Principal principal) {
        return ResponseEntity.ok(Arrays.asList(new ChildrenGroupMT("test"), new ChildrenGroupMT("test2")));
    }
}
