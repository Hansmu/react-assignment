package ee.ttu.ui.core;

import ee.ttu.ui.domain.ExampleEntity;
import ee.ttu.ui.repository.ExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hans on 11.02.2017.
 */
@Service
public class ExampleService {

    @Autowired
    private ExampleRepository exampleRepository;

    public String getHelloWorld() {
        return "Hello world";
    }

    public List<ExampleEntity> getAllExampleEntities() {
        return exampleRepository.findAll();
    }
}
