// Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Reusable showToast function for notifications
    window.showToast = function(message) {
        // Create toast element dynamically if it doesn't exist
        let toast = document.getElementById("toast-notification");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-notification";
            document.body.appendChild(toast);
            
            // Style the toast container
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

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    };

    // 2. Add smooth scrolling functionality for Book / Schedule buttons
    const bookButtons = document.querySelectorAll("a[href^='#'], button");
    bookButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const targetId = button.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                    showToast("Scrolled to section successfully!");
                }
            }
        });
    });

});