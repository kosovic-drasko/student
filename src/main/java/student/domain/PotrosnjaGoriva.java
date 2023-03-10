package student.domain;

/**
 * A PotrosnjaGoriva.
 */
public class PotrosnjaGoriva {

    private Double predjenoKm;

    private Double potrosnjaOtvoreno;

    public Double getPredjenoKm() {
        return predjenoKm;
    }

    public void setPredjenoKm(Double predjenoKm) {
        this.predjenoKm = predjenoKm;
    }

    public Double getPotrosnjaOtvoreno() {
        return potrosnjaOtvoreno;
    }

    public void setPotrosnjaOtvoreno(Double potrosnjaOtvoreno) {
        this.potrosnjaOtvoreno = potrosnjaOtvoreno;
    }

    @Override
    public String toString() {
        return "PotrosnjaGoriva [predjenoKm=" + predjenoKm + ", potrosnjaOtvoreno=" + potrosnjaOtvoreno + "]";
    }
}
