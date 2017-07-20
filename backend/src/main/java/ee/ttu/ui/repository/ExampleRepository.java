package ee.ttu.ui.repository;

import ee.ttu.ui.domain.ExampleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Hans on 11.02.2017.
 */
@Repository
public interface ExampleRepository extends JpaRepository<ExampleEntity, Long> {
}
