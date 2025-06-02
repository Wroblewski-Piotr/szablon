package pl.eventFinder.webService.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.eventFinder.auth.service.SessionService;
import pl.eventFinder.model.modelAndRepository.event.EventRepository;
import pl.eventFinder.webService.mappers.EventMapper;
import pl.eventFinder.webService.model.newEvent.SaveNewEventRequest;

@Service
@RequiredArgsConstructor
public class SaveNewEventService {
    private final EventMapper eventMapper;
    private final EventRepository eventRepository;
    private final SessionService sessionService;

    @Transactional
    public void save(SaveNewEventRequest request) {
        var event = eventMapper.map(request);

        var loggedInUser = sessionService.getLoggedInUser();
        var organization = loggedInUser.getOrganization();
        loggedInUser.getEvents().add(event);
        organization.getEvents().add(event);
        event.setOwnerUser(loggedInUser);
        event.setOwnerOrganization(organization);

        eventRepository.save(event);
    }
}
