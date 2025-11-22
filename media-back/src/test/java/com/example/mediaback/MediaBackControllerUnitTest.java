package com.example.mediaback;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MediaBackControllerUnitTest {

    @Test
    void testHelloEndpoint() {
        MediaBackController controller = new MediaBackController();
        String result = controller.hello();
        assertEquals("Media Back API", result, "L'endpoint / devrait retourner 'Media Back API'");
    }
}
