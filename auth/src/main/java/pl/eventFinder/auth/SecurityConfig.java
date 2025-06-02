package pl.eventFinder.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.eventFinder.auth.filters.CustomAuthenticationFilter;
import pl.eventFinder.auth.filters.CustomAuthorizationFilter;
import pl.eventFinder.auth.service.UserService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomAuthorizationFilter customAuthorizationFilter;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final UserService userService;
    private final SessionHolder sessionHolder;
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;
    @Value("${jwt.auth.token.live-time}")
    private int jwtAuthTokenLiveTime;
    @Value("${jwt.refresh.token.live-time}")
    private int jwtRefreshTokenLiveTime;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/static/**", "/resources/**", "/resources/static/**", "/api/refreshToken", "/api/logout").permitAll()
                                .requestMatchers("/api/**").authenticated()
                )
                .addFilterBefore(
                        new CustomAuthenticationFilter(authenticationManager(), userService, sessionHolder, jwtSecretKey, jwtAuthTokenLiveTime, jwtRefreshTokenLiveTime),
                        UsernamePasswordAuthenticationFilter.class
                )
                .addFilterBefore(customAuthorizationFilter, UsernamePasswordAuthenticationFilter.class).build();
    }
}
