package student.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import student.service.PotrosnjaGorivaService;

/**
 * REST controller for managing {@link student.domain.PotrosnjaGoriva}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PotrosnjaGorivaResource {

    private final Logger log = LoggerFactory.getLogger(PotrosnjaGorivaResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    PotrosnjaGorivaService potrosnjaGorivaService = new PotrosnjaGorivaService();

    @GetMapping("/potrosnja/{potrosnja}/{predjeno}")
    public double izracunajPotrosnju1(
        @PathVariable(value = "potrosnja") final Double potrosnja,
        @PathVariable(value = "predjeno") final Double predjeno
    ) {
        log.debug("Izracunavam potrosnju goriva: {}", potrosnja);

        return potrosnjaGorivaService.izracunaj(potrosnja, predjeno);
    }
}
