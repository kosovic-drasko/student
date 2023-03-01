package student.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import student.service.PotrosnjaService;

@RestController
@RequestMapping("/potrosnja")
class PotrosnjaResorce {

    PotrosnjaService potrosnjaService = new PotrosnjaService();

    @GetMapping
    public void izracunajPotrosnju() {
        // log.debug("REST request to count Students by criteria: {}", criteria);
        potrosnjaService.izracunaj(450);
    }
}
