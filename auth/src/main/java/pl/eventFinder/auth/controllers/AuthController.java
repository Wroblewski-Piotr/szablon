package pl.eventFinder.auth.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.eventFinder.auth.pojo.Session;
import pl.eventFinder.commons.constans.UrlConstans;
import pl.eventFinder.commons.enums.RoleEnum;
import pl.eventFinder.model.modelAndRepository.domain.User;
import pl.eventFinder.auth.SessionHolder;
import pl.eventFinder.auth.service.UserService;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(UrlConstans.API)
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    private final SessionHolder sessionHolder;
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;
    @Value("${jwt.auth.token.live-time}")
    private int jwtAuthTokenLiveTime;
    @Value("${jwt.refresh.token.live-time}")
    private int jwtRefreshTokenLiveTime;

    @PostMapping("/refreshToken")
    public void refreshToken(@RequestBody String refreshToken, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (refreshToken != null) {
            try {
                sessionHolder.vaildateSessionByRefreshToken(refreshToken);
                Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String email = decodedJWT.getSubject();
                User user = userService.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Cant find user with email " + email));
                RoleEnum role = user.getRole();
                List<String> authorities = role.getAuthoritie().stream().map(Enum::name).toList();
                String accessToken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + jwtAuthTokenLiveTime))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("authorities", authorities)
                        .sign(algorithm);
                String newRefreshToken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + jwtRefreshTokenLiveTime))
                        .withIssuer(request.getRequestURL().toString())
                        .sign(algorithm);
                sessionHolder.updateSessionData(refreshToken, newRefreshToken, accessToken);
                Map<String, String> tokens = Map.of("accessToken", accessToken, "refreshToken", newRefreshToken);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(HttpStatus.FORBIDDEN.value());
                Map<String, String> error = Map.of("error_message", e.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @PostMapping("/logout")
    public void logout(@RequestBody Session session) {
        sessionHolder.removeSession(session);
    }
}
