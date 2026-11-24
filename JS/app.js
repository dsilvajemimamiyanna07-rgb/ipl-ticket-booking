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

    // 2. Smooth scrolling functionality
    const interactiveButtons = document.querySelectorAll("a[href^='#']");
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

    // 3. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            showToast("Navigation menu toggled!");
        });
    }

    // 4. Team Filter for Match Table
    const teamFilter = document.getElementById("teamFilter");
    const matchRows = document.querySelectorAll("#matchTable tbody tr");

    if (teamFilter) {
        teamFilter.addEventListener("change", () => {
            const selectedTeam = teamFilter.value;
            matchRows.forEach(row => {
                const rowTeams = row.getAttribute("data-teams") || "";
                if (selectedTeam === "all" || rowTeams.includes(selectedTeam)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
            showToast(`Filtered by: ${selectedTeam.toUpperCase()}`);
        });
    }

    // 5. Live Booking Summary Calculation
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

        if (summaryMatch) summaryMatch.textContent = selectedMatch;
        if (summaryStand) summaryStand.textContent = standName;
        if (summaryQty) summaryQty.textContent = quantity;
        if (summaryTotal) summaryTotal.textContent = totalPrice;

        showToast("Booking Summary updated!");
    }

    if (matchSelect && categorySelect && ticketsInput) {
        matchSelect.addEventListener("change", updateBookingSummary);
        categorySelect.addEventListener("change", updateBookingSummary);
        ticketsInput.addEventListener("change", updateBookingSummary);
    }

    // 6. Auto-select match when clicking "Book Ticket" in the table
    const bookMatchBtns = document.querySelectorAll(".book-match-btn");
    bookMatchBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const chosenMatch = btn.getAttribute("data-match");
            if (matchSelect && chosenMatch) {
                matchSelect.value = chosenMatch;
                updateBookingSummary();
            }
        });
    });
});