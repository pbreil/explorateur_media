package com.example.mediaback;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MediaBackControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testHealthCheckEndpoint() {
        String url = "http://localhost:" + port + "/";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertNotNull(response, "La réponse ne doit pas être null");
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Le statut HTTP doit être 200 OK");
        assertEquals("Media Back API", response.getBody(), "Le corps de la réponse doit être 'Media Back API'");
    }

    @Test
    void testHealthCheckEndpointWithActuator() {
        // Test que l'application démarre correctement (healthcheck implicite)
        String url = "http://localhost:" + port + "/";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode(),
            "L'application doit répondre avec un statut 200, confirmant qu'elle est en bonne santé");
    }
}
