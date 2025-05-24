package pl.juniorJamboree.webService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.juniorJamboree.model.modelAndRepository.domain.Organization;
import pl.juniorJamboree.model.modelAndRepository.domain.OrganizationRepository;
import pl.juniorJamboree.auth.service.UserService;

import java.time.Clock;

@SpringBootApplication(scanBasePackages = "pl.juniorJamboree.*")
@EnableJpaRepositories(value = "pl.juniorJamboree.*")
@EntityScan(value = "pl.juniorJamboree.*")
@ComponentScan(value = "pl.juniorJamboree.*")
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
                Organization organization = TestData.organization("kindergarden1");
            }
        };
    }
}

