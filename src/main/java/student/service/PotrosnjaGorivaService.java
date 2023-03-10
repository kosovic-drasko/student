package student.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import student.domain.PotrosnjaGoriva;

@Service
@Transactional
public class PotrosnjaGorivaService {

    PotrosnjaGoriva potrosnjaGoriva = new PotrosnjaGoriva();

    @Transactional
    public double izracunaj(double potrosnja) {
        potrosnjaGoriva.setPotrosnjaOtvoreno(potrosnja);
        return potrosnjaGoriva.getPotrosnjaOtvoreno();
    }
}
