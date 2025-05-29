package pl.szablon.webService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.szablon.commons.enums.OrganizationTypeEnum;
import pl.szablon.model.modelAndRepository.domain.Organization;
import pl.szablon.model.modelAndRepository.domain.OrganizationRepository;
import pl.szablon.auth.service.UserService;

import java.time.Clock;
import java.util.List;

@SpringBootApplication(scanBasePackages = "pl.szablon.*")
@EnableJpaRepositories(value = "pl.szablon.*")
@EntityScan(value = "pl.szablon.*")
@ComponentScan(value = "pl.szablon.*")
@PropertySource("classpath:application.properties")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public Clock clock() {
        return Clock.systemDefaultZone();
    }

    @Bean
    public CommandLineRunner run(UserService userService, OrganizationRepository organizationRepository) {
        return args -> {
            if(organizationRepository.findAll().isEmpty()) {
                List<Organization> organizations = List.of(
                        TestData.organization("wystawca", OrganizationTypeEnum.EXHIBITOR),
                        TestData.organization("organizator", OrganizationTypeEnum.ORGANIZER)
                );
                organizationRepository.saveAll(organizations);
                organizations.stream().flatMap(organization -> organization.getUsers().stream()).forEach(userService::save);
            }
        };
    }
}

