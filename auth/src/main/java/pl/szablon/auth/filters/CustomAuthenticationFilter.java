package pl.szablon.auth.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.szablon.auth.SessionHolder;
import pl.szablon.auth.pojo.Session;
import pl.szablon.auth.service.UserService;
import pl.szablon.commons.constans.UrlConstans;
import pl.szablon.commons.enums.RoleEnum;
import pl.szablon.model.modelAndRepository.domain.User;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final SessionHolder sessionHolder;
    private final String jwtSecretKey;
    private final int jwtAuthTokenLiveTime;
    private final int jwtRefreshTokenLiveTime;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, SessionHolder sessionHolder, String jwtSecretKey, int jwtAuthTokenLiveTime, int jwtRefreshTokenLiveTime) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.sessionHolder = sessionHolder;
        this.jwtSecretKey = jwtSecretKey;
        this.jwtAuthTokenLiveTime = jwtAuthTokenLiveTime;
        this.jwtRefreshTokenLiveTime = jwtRefreshTokenLiveTime;
        this.setFilterProcessesUrl(UrlConstans.LOGIN);
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String body = request.getReader().lines().collect(Collectors.joining());
        try {
            JSONObject jsonObject = new JSONObject(body);
            String email = (String) jsonObject.get("email");
            String password = (String) jsonObject.get("password");
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(email, password);
            return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (JSONException err) {
            throw new RuntimeException();
        }
    }

    @SneakyThrows
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey.getBytes());
        String email = user.getUsername();
        List<String> privilages = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        User userFromDB = userService.findByEmail(email)
                .orElseThrow(RuntimeException::new);
        RoleEnum role = userFromDB.getRole();

        String accessToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtAuthTokenLiveTime))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("privilages", privilages)
                .sign(algorithm);
        String refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtRefreshTokenLiveTime))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);
        sessionHolder.addToActiveSessions(Session.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .email(email)
                .build());

        Map<String, String> tokens = Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "email", email,
                "name", userFromDB.getName(),
                "surname", userFromDB.getSurname(),
                "role", role.name(),
                "privilages", privilages.toString());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}

