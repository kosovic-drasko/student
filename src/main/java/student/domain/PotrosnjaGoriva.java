package student.domain;

import java.io.Serializable;

/**
 * A PotrosnjaGoriva.
 */
// @Entity
// @Table(name = "potrosnja_goriva")
// @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
// @SuppressWarnings("common-java:DuplicatedBlocks")
public class PotrosnjaGoriva implements Serializable {

    // private static final long serialVersionUID = 1L;

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "id")
    // private Long id;

    // @NotNull
    // @Column(name = "predjeno_km", nullable = false)
    private Double predjenoKm;

    // @Column(name = "potrosnja_otvoreno")
    private Double potrosnjaOtvoreno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    // public Long getId() {
    //     return this.id;
    // }

    // public PotrosnjaGoriva id(Long id) {
    //     this.setId(id);
    //     return this;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    public Double getPredjenoKm() {
        return this.predjenoKm;
    }

    public PotrosnjaGoriva predjenoKm(Double predjenoKm) {
        this.setPredjenoKm(predjenoKm);
        return this;
    }

    public void setPredjenoKm(Double predjenoKm) {
        this.predjenoKm = predjenoKm;
    }

    public Double getPotrosnjaOtvoreno() {
        return this.potrosnjaOtvoreno;
    }

    public PotrosnjaGoriva potrosnjaOtvoreno(Double potrosnjaOtvoreno) {
        this.setPotrosnjaOtvoreno(potrosnjaOtvoreno);
        return this;
    }

    public void setPotrosnjaOtvoreno(int i) {
        this.potrosnjaOtvoreno = (double) i;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PotrosnjaGoriva{" +
            // "id=" + getId() +
            ", predjenoKm=" + getPredjenoKm() +
            ", potrosnjaOtvoreno=" + getPotrosnjaOtvoreno() +
            "}";
    }

    public void setPotrosnjaOtvoreno(double d) {}
}
