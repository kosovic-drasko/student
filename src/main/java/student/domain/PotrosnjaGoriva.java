package student.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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

    public void setPotrosnjaOtvoreno(Double potrosnjaOtvoreno) {
        this.potrosnjaOtvoreno = potrosnjaOtvoreno;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    // @Override
    // public boolean equals(Object o) {
    //     if (this == o) {
    //         return true;
    //     }
    //     if (!(o instanceof PotrosnjaGoriva)) {
    //         return false;
    //     }
    //     return id != null && id.equals(((PotrosnjaGoriva) o).id);
    // }

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
}
