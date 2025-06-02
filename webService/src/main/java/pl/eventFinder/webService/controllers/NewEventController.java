package pl.eventFinder.webService.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.eventFinder.webService.model.newEvent.SaveNewEventRequest;
import pl.eventFinder.webService.services.SaveNewEventService;

@Slf4j
@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class NewEventController {

    private final SaveNewEventService saveNewEventService;

    @PostMapping("")
    @PreAuthorize("hasAuthority(T(pl.eventFinder.commons.enums.PrivilageEnum).MANAGE_ORGANIZATION_EVENTS.name())")
    public ResponseEntity saveEvent(@RequestBody SaveNewEventRequest request) {
        saveNewEventService.save(request);
        return ResponseEntity.ok().build();
    }
}
