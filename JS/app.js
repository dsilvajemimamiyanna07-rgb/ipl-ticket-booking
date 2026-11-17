// Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Reusable showToast function for notifications
    window.showToast = function(message) {
        let toast = document.getElementById("toast-notification");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-notification";
            document.body.appendChild(toast);
            
            toast.style.position = "fixed";
            toast.style.bottom = "20px";
            toast.style.right = "20px";
            toast.style.backgroundColor = "#1a1a2e";
            toast.style.color = "#ffffff";
            toast.style.padding = "12px 20px";
            toast.style.borderRadius = "5px";
            toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
            toast.style.zIndex = "1000";
            toast.style.transition = "opacity 0.3s ease-in-out";
        }

        toast.textContent = message;
        toast.style.opacity = "1";

        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    };

    // 2. Add smooth scrolling functionality for links/buttons
    const interactiveButtons = document.querySelectorAll("a[href^='#'], button");
    interactiveButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const targetId = btn.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                    showToast("Navigated successfully!");
                }
            }
        });
    });

    // 3. Activity 8: Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            showToast("Navigation menu toggled!");
        });
    }

    // 4. Activity 7: Live Booking Summary Calculation & DOM Selectors
    const matchSelect = document.getElementById("match");
    const categorySelect = document.getElementById("category");
    const ticketsInput = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryQty = document.getElementById("summaryQty");
    const summaryTotal = document.getElementById("summaryTotal");

    function updateBookingSummary() {
        if (!matchSelect || !categorySelect || !ticketsInput) return;

        const selectedMatch = matchSelect.value;
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const standName = selectedOption.value;
        const pricePerTicket = parseInt(selectedOption.getAttribute("data-price")) || 0;
        const quantity = parseInt(ticketsInput.value) || 1;

        const totalPrice = pricePerTicket * quantity;

        // Update the Booking Summary Card live
        if (summaryMatch) summaryMatch.textContent = selectedMatch;
        if (summaryStand) summaryStand.textContent = standName;
        if (summaryQty) summaryQty.textContent = quantity;
        if (summaryTotal) summaryTotal.textContent = totalPrice;

        // Confirm update with toast notification
        showToast("Booking Summary updated!");
    }

    // Attach 'change' event listeners to form controls
    if (matchSelect && categorySelect && ticketsInput) {
        matchSelect.addEventListener("change", updateBookingSummary);
        categorySelect.addEventListener("change", updateBookingSummary);
        ticketsInput.addEventListener("change", updateBookingSummary);
    }
});