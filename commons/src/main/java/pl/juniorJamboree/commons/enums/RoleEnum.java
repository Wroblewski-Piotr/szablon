package pl.juniorJamboree.commons.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;


@Getter
public enum RoleEnum {

    ADMIN(Arrays.asList(PrivilageEnum.TEST_PRIVILAGE, PrivilageEnum.TEST_PRIVILAGE_1)),
    ORGANIZER(Arrays.asList(PrivilageEnum.TEST_PRIVILAGE, PrivilageEnum.TEST_PRIVILAGE_1));

    RoleEnum(List<PrivilageEnum> privilages) {
        this.privilages = privilages;
    }

    private List<PrivilageEnum> privilages;
}
