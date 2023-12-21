window.addEventListener('scroll', function() {  
    var background = document.querySelector('.background-container');
    var scrollPercentage = window.scrollY / window.innerHeight;
    
    // Adjust the blur based on scroll percentage
    var blurValue = Math.max(0, 8 - scrollPercentage * 8);
    background.style.filter = `blur(${blurValue}px)`;
}); 

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Signup button clicked');
    var email = document.getElementById('email-input').value;

    console.log(email);
    
    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // Show modal for invalid email
        showModal('Invalid Email Address');
        return;
    }

    // Send POST request
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Clear the input field
        document.getElementById('email-input').value = '';
    })
    .catch(error => console.error('Error:', error));
});

function showModal(message) {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    var text = document.getElementById('modal-text');
    text.innerText = message;

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    setTimeout(function() {
        modal.style.display = "none";
    }, 5000);
}
