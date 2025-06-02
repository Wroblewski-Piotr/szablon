package pl.eventFinder.commons.constans;

import lombok.experimental.UtilityClass;

@UtilityClass
public class UrlConstans {
    public final String API = "/api";
    public final String LOGIN = API + "/login";
    public final String[] UNATHENTICATION_URLS = new String[]{
            LOGIN, API + "/refreshToken"
    };
}
