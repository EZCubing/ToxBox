window.addEventListener('scroll', function() {  
    var background = document.querySelector('.background-container');
    var scrollPercentage = window.scrollY / window.innerHeight;
    
    var blurValue = Math.max(0, 8 - scrollPercentage * 8);
    background.style.filter = `blur(${blurValue}px)`;
}); 

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email-input').value;
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('Invalid Email Address');
        return;
    }

    fetch('https://tox-box.onrender.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('email-input').value = '';
        showModal(data.message);
    }).catch(error => console.error('Error:', error));
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
