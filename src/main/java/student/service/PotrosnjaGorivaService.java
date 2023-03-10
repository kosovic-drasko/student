package student.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import student.domain.PotrosnjaGoriva;

@Service
@Transactional
public class PotrosnjaGorivaService {

    PotrosnjaGoriva potrosnjaGoriva = new PotrosnjaGoriva();

    @Transactional
    public double izracunaj(double potrosnjaOtv, double predjKm) {
        // potrosnjaGoriva.setPotrosnjaOtvoreno(potrosnjaOtvoreno);
        double ukuonaPotrosnja = potrosnjaOtv * predjKm;
        //    System.out.println("Ukupna potrosnja je: ",ukuonaPotrosnja);
        return ukuonaPotrosnja;
    }
}
