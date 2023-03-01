package student.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import student.domain.Potrosnja;

@Service
@Transactional
public class PotrosnjaService {

    Potrosnja potrosnja = new Potrosnja();

    @Transactional
    public void izracunaj() {
        double potr = potrosnja.setPredjenoKm(400);

        System.out.println("Potrosnja je:   " + potr);
    }

    @Transactional
    public double izracunaj1() {
        return 488.00;
    }
}
