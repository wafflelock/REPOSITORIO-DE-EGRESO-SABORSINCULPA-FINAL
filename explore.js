//First Part (Infinite Horizontal Scrolling)


//DOMContentLoaded Event: The script waits for the entire DOM content to load before running.
//Select Elements: It selects all elements with the class .categoria, which are intended to have the infinite scroll effect.
//Clone Content: For each .categoria element, it duplicates its content (firstClone) and appends it at the end. This makes the content twice as long, enabling a seamless scrolling effect.
//Scroll Event Handling: For each .categoria, an onScroll event listener checks if the horizontal scroll position has reached half the scrollable width.
//Looping Effect: When the scroll reaches halfway, the scrollLeft property resets to 0, returning the user to the start of the content. The isScrolling flag prevents this from happening continuously.


// Wait until the entire DOM content is loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with the class 'categoria'
  const categorias = document.querySelectorAll('.categoria');

  // Loop through each selected 'categoria' element
  categorias.forEach(categoria => {
      // Store the inner HTML of the current category
      const firstClone = categoria.innerHTML;
      // Duplicate the inner HTML and append it to the current category
      categoria.insertAdjacentHTML('beforeend', firstClone);

      let isScrolling = false; // Flag to track if a scrolling animation is in progress

      // Add an event listener for the scroll event on the current category
      categoria.addEventListener('scroll', () => {
          // Check if a scrolling animation is not already in progress
          if (!isScrolling) {
              isScrolling = true; // Set the flag to true, indicating scrolling has started

              // Use requestAnimationFrame for smooth animations
              requestAnimationFrame(() => {
                  // If the horizontal scroll position reaches half of the total scroll width
                  if (categoria.scrollLeft >= categoria.scrollWidth / 2) {
                      // Reset the scroll position back to the start
                      categoria.scrollLeft = 0;
                  }
                  isScrolling = false; // Reset the flag to allow further scrolling
              });
          }
      });
  });
});










//Second Part (Vertical Scrolling to Titles)



// Wait until the entire DOM content is loaded before executing the next script
document.addEventListener('DOMContentLoaded', () => {
  // Select the element with the class 'scroll-button'
  const scrollButton = document.querySelector('.scroll-button');
  // Select all <h2> elements that are direct children of <main>
  const titles = document.querySelectorAll('main > h2');
  // Get the height of the navigation bar
  const navbarHeight = document.querySelector('nav').offsetHeight; // Height of the navbar
  let currentIndex = 0; // Initialize the current index for scrolling through titles

  // Add a click event listener to the scroll button
  scrollButton.addEventListener('click', () => {
      // If the current index is less than the number of titles minus one
      if (currentIndex < titles.length - 1) {
          currentIndex++; // Move to the next title
      } else {
          currentIndex = 0; // Reset to the first title if currently at the last one
      }

      // Calculate the vertical offset for the next title, considering the navbar height
      const titleOffset = titles[currentIndex].offsetTop - navbarHeight;

      // Smoothly scroll to the calculated offset position
      window.scrollTo({
          top: titleOffset, // The target scroll position
          behavior: 'smooth' // Enables smooth scrolling
      });
  });
});
