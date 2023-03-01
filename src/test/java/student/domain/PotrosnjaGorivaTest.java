package student.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import student.web.rest.TestUtil;

class PotrosnjaGorivaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PotrosnjaGoriva.class);
        PotrosnjaGoriva potrosnjaGoriva1 = new PotrosnjaGoriva();
        potrosnjaGoriva1.setId(1L);
        PotrosnjaGoriva potrosnjaGoriva2 = new PotrosnjaGoriva();
        potrosnjaGoriva2.setId(potrosnjaGoriva1.getId());
        assertThat(potrosnjaGoriva1).isEqualTo(potrosnjaGoriva2);
        potrosnjaGoriva2.setId(2L);
        assertThat(potrosnjaGoriva1).isNotEqualTo(potrosnjaGoriva2);
        potrosnjaGoriva1.setId(null);
        assertThat(potrosnjaGoriva1).isNotEqualTo(potrosnjaGoriva2);
    }
}
