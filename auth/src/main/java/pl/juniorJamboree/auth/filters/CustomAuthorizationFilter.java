package pl.juniorJamboree.auth.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.juniorJamboree.commons.constans.UrlConstans;
import pl.juniorJamboree.auth.SessionHolder;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    public static final String BEARER = "Bearer ";
    public static final int BEARER_LENGTH = BEARER.length();

    private final SessionHolder sessionHolder;
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (Arrays.asList(UrlConstans.UNATHENTICATION_URLS).contains(request.getServletPath())) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {
                try {
                    String token = authorizationHeader.substring(BEARER_LENGTH);
                    sessionHolder.vaildateSessionByAccesToken(token);

                    Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey.getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String email = decodedJWT.getSubject();
                    List<String> privilages = decodedJWT.getClaim("privilages").asList(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayDeque<>();
                    privilages.forEach(privilage -> authorities.add(new SimpleGrantedAuthority(privilage)));

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (SessionAuthenticationException | TokenExpiredException sae){
                    handleError(response, sae);
                } catch (Exception e) {
                    handleError(response, e);
                    log.error("Something gone wrong when Authorization", e);
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }

    private void handleError(HttpServletResponse response, Exception e) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        Map<String, String> error = Map.of("error_message", e.getMessage());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}
