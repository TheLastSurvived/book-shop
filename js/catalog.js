// Функциональность для страницы каталога
document.addEventListener("DOMContentLoaded", function () {
  // Переключение между видами сетки и списка
  const gridViewBtn = document.getElementById("gridView");
  const listViewBtn = document.getElementById("listView");
  const booksContainer = document.getElementById("booksContainer");

  if (gridViewBtn && listViewBtn && booksContainer) {
    gridViewBtn.addEventListener("click", function () {
      booksContainer.classList.remove("list-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");

      // Обновляем классы карточек
      document.querySelectorAll(".book-card.catalog-view").forEach((card) => {
        card.classList.remove("list-view");
      });
    });

    listViewBtn.addEventListener("click", function () {
      booksContainer.classList.add("list-view");
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");

      // Обновляем классы карточек
      document.querySelectorAll(".book-card.catalog-view").forEach((card) => {
        card.classList.add("list-view");
      });
    });
  }

  // Сброс фильтров
  const resetFiltersBtn = document.getElementById("resetFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
    
      document
        .querySelectorAll('.filter-options input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });

   
      document
        .querySelectorAll('.price-filter input[type="number"]')
        .forEach((input) => {
          if (input.placeholder === "От") {
            input.value = "0";
          } else {
            input.value = "100";
          }
        });

      // Сбрасываем ползунок цены
      const priceRange = document.querySelector(
        '.price-filter input[type="range"]'
      );
      if (priceRange) {
        priceRange.value = "100";
      }
    });
  }


  const priceInputs = document.querySelectorAll(
    '.price-filter input[type="number"]'
  );
  const priceRange = document.querySelector(
    '.price-filter input[type="range"]'
  );

  if (priceInputs.length && priceRange) {
    priceInputs.forEach((input) => {
      input.addEventListener("input", function () {
     
        const maxPrice = Math.max(
          parseFloat(priceInputs[0].value) || 0,
          parseFloat(priceInputs[1].value) || 0
        );
        priceRange.value = Math.min(maxPrice, 200);
      });
    });

    priceRange.addEventListener("input", function () {
      
      if (priceInputs[1]) {
        priceInputs[1].value = priceRange.value;
      }
    });
  }

  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

 
  document.querySelectorAll(".book-card.catalog-view").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
});
