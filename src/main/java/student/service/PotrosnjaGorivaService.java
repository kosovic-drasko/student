package student.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import student.domain.PotrosnjaGoriva;

@Service
@Transactional
public class PotrosnjaGorivaService {

    PotrosnjaGoriva potrosnjaGoriva = new PotrosnjaGoriva();

    @Transactional
    public double izracunaj() {
        potrosnjaGoriva.setPotrosnjaOtvoreno(20);
        return potrosnjaGoriva.getPotrosnjaOtvoreno();
    }
}
