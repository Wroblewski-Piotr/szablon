package pl.juniorJamboree.webService;

import lombok.experimental.UtilityClass;
import pl.juniorJamboree.commons.enums.OrganizationTypeEnum;
import pl.juniorJamboree.commons.enums.RoleEnum;
import pl.juniorJamboree.model.modelAndRepository.child.Child;
import pl.juniorJamboree.model.modelAndRepository.childrenGroup.ChildrenGroup;
import pl.juniorJamboree.model.modelAndRepository.domain.Organization;
import pl.juniorJamboree.model.modelAndRepository.domain.User;

import java.util.List;

@UtilityClass
public class TestData {
    public static Organization organization(String organizationName) {
        Organization organization = Organization.builder()
                .name(organizationName)
                .organizationType(OrganizationTypeEnum.KINDERGARTEN)
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

        ChildrenGroup childrenGroup1 = childrenGroup(organizationName, 1, 12);
        ChildrenGroup childrenGroup2 = childrenGroup(organizationName, 2, 8);
        ChildrenGroup childrenGroup3 = childrenGroup(organizationName, 2, 8);


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

    private static ChildrenGroup childrenGroup(String organizationName, int ordinalNumber, int numberOfChildren) {
        String groupName = "group " + organizationName + " " + ordinalNumber;
        return ChildrenGroup.builder()
                .name(groupName)
                .build();
    }

    private static Child child(String groupName, int ordinalNumber) {
        return Child.builder()
                .name("child" + groupName + ordinalNumber)
                .build();
    }
}
