window.addEventListener('scroll', function() { 
    var background = document.querySelector('.background-container');
    var scrollPercentage = window.scrollY / window.innerHeight;
    
    // Adjust the blur based on scroll percentage
    var blurValue = Math.max(0, 8 - scrollPercentage * 8);
    background.style.filter = `blur(${blurValue}px)`;
}); 
