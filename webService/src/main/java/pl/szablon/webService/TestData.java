package pl.szablon.webService;

import lombok.experimental.UtilityClass;
import pl.szablon.commons.enums.RoleEnum;
import pl.szablon.model.modelAndRepository.domain.Organization;
import pl.szablon.model.modelAndRepository.domain.User;

import java.util.List;

@UtilityClass
public class TestData {
    public static Organization organization(String organizationName) {
        Organization organization = Organization.builder()
                .name(organizationName)
                .build();;

        organization.setUsers(
                List.of(
                        user(organizationName, RoleEnum.ADMIN, 1),
                        user(organizationName, RoleEnum.ADMIN, 2),
                        user(organizationName, RoleEnum.ORGANIZER, 1),
                        user(organizationName, RoleEnum.ORGANIZER, 2)
                )
        );
        organization.getUsers().forEach(user -> user.setOrganization(organization));

        return organization;
    };

    private static User user(String organizationName, RoleEnum role, int ordinalNumber) {
        String roleString = role.name().toLowerCase();
        return User.builder()
                .email(roleString + ordinalNumber + "@" + organizationName + ".com")
                .name(roleString + ordinalNumber + "Name")
                .surname(roleString + ordinalNumber + "Surname")
                .password(roleString + ordinalNumber + "@" + organizationName + ".com")
                .role(role)
                .build();
    }
}
