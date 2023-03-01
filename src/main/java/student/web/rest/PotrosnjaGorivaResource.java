package student.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import student.domain.PotrosnjaGoriva;
import student.service.PotrosnjaService;
import student.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

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

    PotrosnjaService potrosnjaService = new PotrosnjaService();

    public PotrosnjaGorivaResource() {}
    // @GetMapping()
    // public void izracunajPotrosnju() {
    //     // log.debug("REST request to count Students by criteria: {}", criteria);
    //     potrosnjaService.izracunaj(450);
    // }
}
