from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Create a dummy user object
    dummy_user = {
        "id": "123",
        "name": "Test User",
        "email": "test@example.com"
    }

    # Create a dummy address
    dummy_address = {
        "fullAddress": "123 Test Street, Test City",
        "coordinates": { "lat": 16.785692464382592, "lng": 96.17045650343823 }
    }

    # Set the user and address in local storage
    page.evaluate(f"localStorage.setItem('coffee-shop-auth-user', '{json.dumps(dummy_user)}')")
    page.evaluate(f"localStorage.setItem('coffee-shop-auth-user-address', '{json.dumps(dummy_address)}')")

    # Reload the page to apply the new state
    page.reload()

    # Click the button to open the address modal
    change_button = page.locator('div.absolute.top-2.right-2 > button')
    change_button.click()

    page.wait_for_selector(".leaflet-container")
    # Save the screenshot in the public directory
    page.screenshot(path="frontend/public/verification.png")
    browser.close()
