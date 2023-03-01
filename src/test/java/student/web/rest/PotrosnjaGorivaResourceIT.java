package student.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import student.IntegrationTest;
import student.domain.PotrosnjaGoriva;
import student.repository.PotrosnjaGorivaRepository;

/**
 * Integration tests for the {@link PotrosnjaGorivaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PotrosnjaGorivaResourceIT {

    private static final Double DEFAULT_PREDJENO_KM = 1D;
    private static final Double UPDATED_PREDJENO_KM = 2D;

    private static final Double DEFAULT_POTROSNJA_OTVORENO = 1D;
    private static final Double UPDATED_POTROSNJA_OTVORENO = 2D;

    private static final String ENTITY_API_URL = "/api/potrosnja-gorivas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PotrosnjaGorivaRepository potrosnjaGorivaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPotrosnjaGorivaMockMvc;

    private PotrosnjaGoriva potrosnjaGoriva;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PotrosnjaGoriva createEntity(EntityManager em) {
        PotrosnjaGoriva potrosnjaGoriva = new PotrosnjaGoriva()
            .predjenoKm(DEFAULT_PREDJENO_KM)
            .potrosnjaOtvoreno(DEFAULT_POTROSNJA_OTVORENO);
        return potrosnjaGoriva;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PotrosnjaGoriva createUpdatedEntity(EntityManager em) {
        PotrosnjaGoriva potrosnjaGoriva = new PotrosnjaGoriva()
            .predjenoKm(UPDATED_PREDJENO_KM)
            .potrosnjaOtvoreno(UPDATED_POTROSNJA_OTVORENO);
        return potrosnjaGoriva;
    }

    @BeforeEach
    public void initTest() {
        potrosnjaGoriva = createEntity(em);
    }

    @Test
    @Transactional
    void createPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeCreate = potrosnjaGorivaRepository.findAll().size();
        // Create the PotrosnjaGoriva
        restPotrosnjaGorivaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isCreated());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeCreate + 1);
        PotrosnjaGoriva testPotrosnjaGoriva = potrosnjaGorivaList.get(potrosnjaGorivaList.size() - 1);
        assertThat(testPotrosnjaGoriva.getPredjenoKm()).isEqualTo(DEFAULT_PREDJENO_KM);
        assertThat(testPotrosnjaGoriva.getPotrosnjaOtvoreno()).isEqualTo(DEFAULT_POTROSNJA_OTVORENO);
    }

    @Test
    @Transactional
    void createPotrosnjaGorivaWithExistingId() throws Exception {
        // Create the PotrosnjaGoriva with an existing ID
        potrosnjaGoriva.setId(1L);

        int databaseSizeBeforeCreate = potrosnjaGorivaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPotrosnjaGorivaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPredjenoKmIsRequired() throws Exception {
        int databaseSizeBeforeTest = potrosnjaGorivaRepository.findAll().size();
        // set the field null
        potrosnjaGoriva.setPredjenoKm(null);

        // Create the PotrosnjaGoriva, which fails.

        restPotrosnjaGorivaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPotrosnjaGorivas() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        // Get all the potrosnjaGorivaList
        restPotrosnjaGorivaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(potrosnjaGoriva.getId().intValue())))
            .andExpect(jsonPath("$.[*].predjenoKm").value(hasItem(DEFAULT_PREDJENO_KM.doubleValue())))
            .andExpect(jsonPath("$.[*].potrosnjaOtvoreno").value(hasItem(DEFAULT_POTROSNJA_OTVORENO.doubleValue())));
    }

    @Test
    @Transactional
    void getPotrosnjaGoriva() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        // Get the potrosnjaGoriva
        restPotrosnjaGorivaMockMvc
            .perform(get(ENTITY_API_URL_ID, potrosnjaGoriva.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(potrosnjaGoriva.getId().intValue()))
            .andExpect(jsonPath("$.predjenoKm").value(DEFAULT_PREDJENO_KM.doubleValue()))
            .andExpect(jsonPath("$.potrosnjaOtvoreno").value(DEFAULT_POTROSNJA_OTVORENO.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingPotrosnjaGoriva() throws Exception {
        // Get the potrosnjaGoriva
        restPotrosnjaGorivaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPotrosnjaGoriva() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();

        // Update the potrosnjaGoriva
        PotrosnjaGoriva updatedPotrosnjaGoriva = potrosnjaGorivaRepository.findById(potrosnjaGoriva.getId()).get();
        // Disconnect from session so that the updates on updatedPotrosnjaGoriva are not directly saved in db
        em.detach(updatedPotrosnjaGoriva);
        updatedPotrosnjaGoriva.predjenoKm(UPDATED_PREDJENO_KM).potrosnjaOtvoreno(UPDATED_POTROSNJA_OTVORENO);

        restPotrosnjaGorivaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPotrosnjaGoriva.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPotrosnjaGoriva))
            )
            .andExpect(status().isOk());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
        PotrosnjaGoriva testPotrosnjaGoriva = potrosnjaGorivaList.get(potrosnjaGorivaList.size() - 1);
        assertThat(testPotrosnjaGoriva.getPredjenoKm()).isEqualTo(UPDATED_PREDJENO_KM);
        assertThat(testPotrosnjaGoriva.getPotrosnjaOtvoreno()).isEqualTo(UPDATED_POTROSNJA_OTVORENO);
    }

    @Test
    @Transactional
    void putNonExistingPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, potrosnjaGoriva.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePotrosnjaGorivaWithPatch() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();

        // Update the potrosnjaGoriva using partial update
        PotrosnjaGoriva partialUpdatedPotrosnjaGoriva = new PotrosnjaGoriva();
        partialUpdatedPotrosnjaGoriva.setId(potrosnjaGoriva.getId());

        partialUpdatedPotrosnjaGoriva.predjenoKm(UPDATED_PREDJENO_KM);

        restPotrosnjaGorivaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPotrosnjaGoriva.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPotrosnjaGoriva))
            )
            .andExpect(status().isOk());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
        PotrosnjaGoriva testPotrosnjaGoriva = potrosnjaGorivaList.get(potrosnjaGorivaList.size() - 1);
        assertThat(testPotrosnjaGoriva.getPredjenoKm()).isEqualTo(UPDATED_PREDJENO_KM);
        assertThat(testPotrosnjaGoriva.getPotrosnjaOtvoreno()).isEqualTo(DEFAULT_POTROSNJA_OTVORENO);
    }

    @Test
    @Transactional
    void fullUpdatePotrosnjaGorivaWithPatch() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();

        // Update the potrosnjaGoriva using partial update
        PotrosnjaGoriva partialUpdatedPotrosnjaGoriva = new PotrosnjaGoriva();
        partialUpdatedPotrosnjaGoriva.setId(potrosnjaGoriva.getId());

        partialUpdatedPotrosnjaGoriva.predjenoKm(UPDATED_PREDJENO_KM).potrosnjaOtvoreno(UPDATED_POTROSNJA_OTVORENO);

        restPotrosnjaGorivaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPotrosnjaGoriva.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPotrosnjaGoriva))
            )
            .andExpect(status().isOk());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
        PotrosnjaGoriva testPotrosnjaGoriva = potrosnjaGorivaList.get(potrosnjaGorivaList.size() - 1);
        assertThat(testPotrosnjaGoriva.getPredjenoKm()).isEqualTo(UPDATED_PREDJENO_KM);
        assertThat(testPotrosnjaGoriva.getPotrosnjaOtvoreno()).isEqualTo(UPDATED_POTROSNJA_OTVORENO);
    }

    @Test
    @Transactional
    void patchNonExistingPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, potrosnjaGoriva.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isBadRequest());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPotrosnjaGoriva() throws Exception {
        int databaseSizeBeforeUpdate = potrosnjaGorivaRepository.findAll().size();
        potrosnjaGoriva.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPotrosnjaGorivaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(potrosnjaGoriva))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PotrosnjaGoriva in the database
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePotrosnjaGoriva() throws Exception {
        // Initialize the database
        potrosnjaGorivaRepository.saveAndFlush(potrosnjaGoriva);

        int databaseSizeBeforeDelete = potrosnjaGorivaRepository.findAll().size();

        // Delete the potrosnjaGoriva
        restPotrosnjaGorivaMockMvc
            .perform(delete(ENTITY_API_URL_ID, potrosnjaGoriva.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PotrosnjaGoriva> potrosnjaGorivaList = potrosnjaGorivaRepository.findAll();
        assertThat(potrosnjaGorivaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
