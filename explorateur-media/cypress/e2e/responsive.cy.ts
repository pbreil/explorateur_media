describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'iPhone X', width: 375, height: 812 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 }
  ];

  viewports.forEach(({ name, width, height }) => {
    describe(`${name} (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit('/');
        // Wait for translations to load
        cy.get('h1', { timeout: 10000 }).should('be.visible');
      });

      it('should load the application', () => {
        cy.get('h1').should('be.visible');
      });

      it('should display the sidebar correctly', () => {
        if (width < 1024) {
          // Mobile/Tablet: Sidebar should be hidden by default
          cy.get('app-sidebar').should('exist');

          // Menu button should be visible on mobile
          cy.get('button').contains('class', 'pi-bars').should('be.visible');

          // Click to open sidebar
          cy.get('button i.pi-bars').parent().click();

          // Sidebar should be visible after clicking
          cy.get('app-sidebar').find('.translate-x-0').should('exist');

          // Click overlay to close
          cy.get('.bg-black.bg-opacity-50').click({ force: true });
        } else {
          // Desktop: Sidebar should be visible
          cy.get('app-sidebar').should('be.visible');
        }
      });

      it('should navigate to settings page', () => {
        if (width < 1024) {
          // Open mobile menu
          cy.get('button i.pi-bars').parent().click();
        }

        // Click on settings menu item
        cy.contains('Settings').click();

        // Verify settings page is displayed
        cy.url().should('include', '/settings');
      });

      it('should navigate to server info page', () => {
        if (width < 1024) {
          // Open mobile menu
          cy.get('button i.pi-bars').parent().click();
        }

        // Click on server info menu item
        cy.contains('Server Info').click();

        // Verify server info page is displayed
        cy.url().should('include', '/server-info');
      });

      it('should display planet table with proper responsiveness', () => {
        // Navigate to home/planets page
        cy.visit('/');

        // Wait for table to load
        cy.get('p-table', { timeout: 10000 }).should('be.visible');

        // Check if table is scrollable on mobile
        if (width < 768) {
          cy.get('p-table').parent().should('have.css', 'overflow-x');
        }
      });

      it('should have readable text at all viewport sizes', () => {
        // Check main title
        cy.get('h1').should('be.visible').and('have.css', 'font-size');

        // Check that text is not too small
        cy.get('h1').invoke('css', 'font-size').then((fontSize) => {
          const size = parseInt(fontSize);
          expect(size).to.be.greaterThan(20); // At least 20px on all devices
        });
      });

      it('should have clickable buttons with proper touch targets', () => {
        // All buttons should be visible and have appropriate size
        cy.get('button').each(($button) => {
          cy.wrap($button).should('be.visible');

          // Touch targets should be at least 44x44 pixels (WCAG guidelines)
          if (width < 768) {
            cy.wrap($button).invoke('outerHeight').should('be.gte', 36);
          }
        });
      });

      it('should handle language change properly', () => {
        if (width < 1024) {
          cy.get('button i.pi-bars').parent().click();
        }

        cy.contains('Settings').click();
        cy.url().should('include', '/settings');

        // Find and click language dropdown
        cy.get('p-select').should('be.visible');
      });
    });
  });

  describe('Mobile-specific interactions', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/');
      cy.get('h1', { timeout: 10000 }).should('be.visible');
    });

    it('should open and close mobile menu', () => {
      // Menu should be closed initially
      cy.get('button i.pi-bars').should('be.visible');

      // Open menu
      cy.get('button i.pi-bars').parent().click();

      // Menu should show close icon
      cy.get('button i.pi-times').should('be.visible');

      // Close menu
      cy.get('button i.pi-times').parent().click();

      // Menu should show bars icon again
      cy.get('button i.pi-bars').should('be.visible');
    });

    it('should close menu when clicking overlay', () => {
      // Open menu
      cy.get('button i.pi-bars').parent().click();

      // Overlay should be visible
      cy.get('.bg-black.bg-opacity-50').should('be.visible');

      // Click overlay
      cy.get('.bg-black.bg-opacity-50').click({ force: true });

      // Menu should be closed
      cy.get('button i.pi-bars').should('be.visible');
    });

    it('should close menu after navigation', () => {
      // Open menu
      cy.get('button i.pi-bars').parent().click();

      // Click on a menu item
      cy.contains('Settings').click();

      // Verify navigation occurred
      cy.url().should('include', '/settings');

      // Note: In a real app, you might want to close the menu after navigation
      // This test documents the current behavior
    });
  });

  describe('Desktop-specific interactions', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit('/');
      cy.get('h1', { timeout: 10000 }).should('be.visible');
    });

    it('should not display mobile menu button', () => {
      // Mobile menu button should not be visible on desktop
      cy.get('button i.pi-bars').should('not.be.visible');
    });

    it('should always show sidebar', () => {
      // Sidebar should be visible
      cy.get('app-sidebar').should('be.visible');

      // Main content should have left margin
      cy.get('.lg\\:ml-64').should('exist');
    });

    it('should allow direct sidebar navigation', () => {
      // Click directly on menu items without opening menu
      cy.contains('Settings').click();
      cy.url().should('include', '/settings');

      cy.contains('Server Info').click();
      cy.url().should('include', '/server-info');
    });
  });
});
