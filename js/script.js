// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#list").onclick = (event) => {
  event.preventDefault();
  navbarNav.classList.toggle("active");
};

document.querySelector(".navbar").addEventListener("click", function () {
  this.classList.toggle("active");
});

// gallery
const itemDetailModalOne = document.querySelector("#item-product");
const itemDetailButtonsOne = document.querySelectorAll(".product-class");

itemDetailButtonsOne.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModalOne.style.display = "flex";
    itemDetailModalTwo.style.display = "none";
    itemDetailModalFour.style.display = "none";
    itemDetailModalThree.style.display = "none";
    e.preventDefault();
  };
});

// galerry-Two
const itemDetailModalTwo = document.querySelector("#item-service");
const itemDetailButtonsTwo = document.querySelectorAll(".service-class");

itemDetailButtonsTwo.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModalTwo.style.display = "flex";
    itemDetailModalOne.style.display = "none";
    itemDetailModalFour.style.display = "none";
    itemDetailModalThree.style.display = "none";
    e.preventDefault();
  };
});

// gallery-four
const itemDetailModalFour = document.querySelector("#item-porto");
const itemDetailButtonsFour = document.querySelectorAll(".porto-class");
const judulDetailButtonsFour = document.querySelector("#judul-porto");

itemDetailButtonsFour.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModalFour.style.display = "flex";
    itemDetailModalOne.style.display = "none";
    itemDetailModalTwo.style.display = "none";
    judulDetailButtonsFour.style.visibility = "hidden";
    itemDetailModalThree.style.display = "none";
    e.preventDefault();
  };
});

// gallery-three
const itemDetailModalThree = document.querySelector("#item-aksesoris");
const itemDetailButtonsThree = document.querySelectorAll(".accesories-class");

itemDetailButtonsThree.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModalFour.style.display = "none";
    itemDetailModalOne.style.display = "none";
    itemDetailModalTwo.style.display = "none";
    itemDetailModalThree.style.display = "flex";
    e.preventDefault();
  };
});

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
