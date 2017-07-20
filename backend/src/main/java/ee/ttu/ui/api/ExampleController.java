package ee.ttu.ui.api;

import ee.ttu.ui.core.ExampleService;
import ee.ttu.ui.domain.common.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Hans on 11.02.2017.
 */
@RestController
@CrossOrigin(origins="http://localhost:8080")
@RequestMapping("example")
public class ExampleController {

    @Autowired
    private ExampleService exampleService;

    @RequestMapping(value="hello-world", method = RequestMethod.GET)
    public Result getHelloWorld() {
        return Result.ok(exampleService.getHelloWorld());
    }

    @RequestMapping(value="all", method = RequestMethod.GET)
    public Result getAllExampleEntities() {
        return Result.ok(exampleService.getAllExampleEntities());
    }
}
