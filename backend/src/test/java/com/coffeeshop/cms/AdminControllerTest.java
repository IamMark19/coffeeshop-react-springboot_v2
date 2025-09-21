package com.coffeeshop.cms;

import com.coffeeshop.cms.controller.AdminInventoryController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AdminControllerTest {

    @Autowired
    private AdminInventoryController adminInventoryController;

    @Test
    public void contextLoads() {
        assertThat(adminInventoryController).isNotNull();
    }
}
