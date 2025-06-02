package pl.eventFinder.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.eventFinder.model.modelAndRepository.domain.User;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final UserService userService;

    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
                ? userService.findByEmail(authentication.getName()).orElse(null)
                : null;
    }
}
