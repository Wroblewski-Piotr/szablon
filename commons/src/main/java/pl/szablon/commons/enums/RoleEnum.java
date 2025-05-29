package pl.szablon.commons.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;


@Getter
public enum RoleEnum {

    ADMIN_ORGANIZER(List.of(PrivilageEnum.MANAGE_ORGANIZATION_EVENTS, PrivilageEnum.MANAGE_APPLICATIONS_FOR_ORGANIZATION_EVENTS)),
    ADMIN_EXHIBITOR(List.of(PrivilageEnum.SEARCH_EVENTS, PrivilageEnum.POSSIBILITY_TO_PARTICIPATE_IN_EVENTS));

    RoleEnum(List<PrivilageEnum> privilages) {
        this.privilages = privilages;
    }

    private final List<PrivilageEnum> privilages;
}
