package pl.eventFinder.auth;

import lombok.Data;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;
import pl.eventFinder.auth.pojo.Session;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
public class SessionHolder {

    private List<Session> activeSessions = new ArrayList<>();

    public void addToActiveSessions(Session session) {
        activeSessions.add(session);
    }

    public void vaildateSessionByAccesToken(String accessToken) throws SessionAuthenticationException {
        boolean sessionActive = activeSessions.stream()
                .map(Session::getAccessToken)
                .toList()
                .contains(accessToken);
        if (!sessionActive) {
            throw new SessionAuthenticationException("Session not exist");
        }
    }

    public void vaildateSessionByRefreshToken(String refreshToken) throws SessionAuthenticationException {
        boolean sessionActive = activeSessions.stream()
                .map(Session::getRefreshToken)
                .toList()
                .contains(refreshToken);
        if (!sessionActive) {
            throw new SessionAuthenticationException("Session not exist");
        }
    }

    public void updateSessionData(String oldRefreshToken, String newRefreshToken, String newAccessToken) {
        activeSessions.stream()
                .filter(session -> session.getRefreshToken().equals(oldRefreshToken))
                .findAny()
                .orElseThrow(RuntimeException::new)
                .setAccessToken(newAccessToken)
                .setRefreshToken(newRefreshToken);
    }

    public void removeSession(Session sessionToRemove) {
        activeSessions.removeIf(session -> session.getAccessToken().equals(sessionToRemove.getAccessToken()));
    }
}
