package pl.eventFinder.webService.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.eventFinder.model.modelAndRepository.event.Event;
import pl.eventFinder.webService.model.newEvent.SaveNewEventRequest;

@Mapper(
        componentModel = "spring",
        unmappedSourcePolicy = ReportingPolicy.WARN,
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface EventMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ownerOrganization", ignore = true)
    @Mapping(target = "ownerUser", ignore = true)
    Event map(SaveNewEventRequest souurce);
}
