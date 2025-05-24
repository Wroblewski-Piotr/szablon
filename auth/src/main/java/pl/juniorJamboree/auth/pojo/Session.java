package pl.juniorJamboree.auth.pojo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Session {
    String refreshToken;
    String accessToken;
    String userEmail;

    public Session setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public Session setAccessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }
}
