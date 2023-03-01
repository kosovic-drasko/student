package student.domain;

public class Potrosnja {

    private double predjenoKm;
    private final double potrosnjaOtvoreno = 5;

    public double getPredjenoKm() {
        return predjenoKm;
    }

    public double setPredjenoKm(double predjenoKm) {
        return this.predjenoKm = predjenoKm;
    }

    public Potrosnja(double predjenoKm) {
        this.predjenoKm = predjenoKm;
    }

    public Potrosnja() {}

    @Override
    public String toString() {
        return "Potrosnja [predjenoKm=" + predjenoKm + ", potrosnjaOtvoreno=" + potrosnjaOtvoreno + "]";
    }
}
