document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    };

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Handle contact form submission
    const form = document.querySelector('#contact form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('submit_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const messageBox = document.createElement('div');
            if (data.success) {
                messageBox.className = 'p-4 text-white bg-green-500';
                messageBox.textContent = 'Thank you for your message!';
            } else {
                messageBox.className = 'p-4 text-white bg-red-500';
                messageBox.textContent = 'An error occurred. Please try again.';
            }
            form.prepend(messageBox);
            setTimeout(() => messageBox.remove(), 5000);
        })
        .catch(() => {
            const errorBox = document.createElement('div');
            errorBox.className = 'p-4 text-white bg-red-500';
            errorBox.textContent = 'There was a technical error. Please try again.';
            form.prepend(errorBox);
            setTimeout(() => errorBox.remove(), 5000);
        });
    });
});
