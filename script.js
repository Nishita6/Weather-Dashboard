const reveal = document.querySelector(".hb")
const hidden = document.querySelector(".sidebar")
// function to open navigtion bar when hb is clicked
function revealcontent() {
    if (hidden.classList.contains('hb')) {
        hidden.classList.remove("hb")

    }
    else {
        hidden.classList.add('hb')
    }
  }
reveal.addEventListener("click", revealcontent)
const header = document.querySelector(".header")

// to scroll bottom of the page when social media or terms of condition clicked in navigation bar

// Add a click event listener to scroll to the bottom
document.querySelector('#SocialMedia').addEventListener('click', function () {
  const footer = document.querySelector('.footer');
  if (footer) {
    
    footer.scrollTo({ behavior: 'smooth', block: 'start' });
  } else {
    console.error('Footer element not found!');
  }
});

// Add a click event listener to scroll to the bottom
document.querySelector('#tc').addEventListener('click', function () {
  const footer = document.querySelector('.footer');
  if (footer) {
    
    footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.error('Footer element not found!');
  }
});

// to scroll to top of page when ^ button is clicked 
const topButton = document.querySelector('.top');

// Add a click event listener to scroll to the top
topButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,         // Scroll to the top of the page
    behavior: 'smooth' // Smooth scrolling effect
  });
});



const sidebar = document.querySelector('.sidebar');
const sidebarButtons = document.querySelectorAll('.sidebartext');

function closeSidebar() {
  sidebar.style.display = 'none'; //  sidebar close
}

sidebarButtons.forEach(button => {
  button.addEventListener('click', closeSidebar);
});

let time = document.querySelector(".time");


document.querySelector('.searchbarnav').addEventListener('keypress', function (event) {
  if(event.key == 'Enter'){
  const location = event.target.value.trim();
  if (location) {
     closeSidebar(); 
  } else {
      alert('Please enter a valid location.');
  }
} 
});
