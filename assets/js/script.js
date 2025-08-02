document.addEventListener("DOMContentLoaded", () => {
      "use strict";

      // Element toggle
      const elementToggleFunc = (elem) => {
        elem.classList.toggle("active");
      };

      // Sidebar toggle
      const sidebar = document.querySelector("[data-sidebar]");
      const sidebarBtn = document.querySelector("[data-sidebar-btn]");
      if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener("click", () => {
          elementToggleFunc(sidebar);
        });
      }

      // Testimonials modal
      const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
      const modalContainer = document.querySelector("[data-modal-container]");
      const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
      const overlay = document.querySelector("[data-overlay]");
      const modalImg = document.querySelector("[data-modal-img]");
      const modalTitle = document.querySelector("[data-modal-title]");
      const modalText = document.querySelector("[data-modal-text]");

      const testimonialsModalFunc = () => {
        if (modalContainer) modalContainer.classList.toggle("active");
        if (overlay) overlay.classList.toggle("active");
      };

      testimonialsItem.forEach((item) => {
        item.addEventListener("click", function () {
          const avatar = this.querySelector("[data-testimonials-avatar]");
          const title = this.querySelector("[data-testimonials-title]");
          const text = this.querySelector("[data-testimonials-text]");
          if (avatar && modalImg) {
            modalImg.src = avatar.src;
            modalImg.alt = avatar.alt;
          }
          if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
          if (text && modalText) modalText.innerHTML = text.innerHTML;
          testimonialsModalFunc();
        });
      });

      if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
      if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

      // Custom select / filter
      const select = document.querySelector("[data-select]");
      const selectItems = document.querySelectorAll("[data-select-item]");
      const selectValue = document.querySelector("[data-selecct-value]");
      const filterBtn = document.querySelectorAll("[data-filter-btn]");
      const filterItems = document.querySelectorAll("[data-filter-item]");

      const filterFunc = (selectedValue) => {
        filterItems.forEach((fi) => {
          if (selectedValue === "all" || fi.dataset.category === selectedValue) {
            fi.classList.add("active");
          } else {
            fi.classList.remove("active");
          }
        });
      };

      if (select) {
        select.addEventListener("click", function () {
          elementToggleFunc(this);
        });
      }

      selectItems.forEach((it) => {
        it.addEventListener("click", function () {
          const val = this.innerText.toLowerCase();
          if (selectValue) selectValue.innerText = this.innerText;
          if (select) elementToggleFunc(select);
          filterFunc(val);
        });
      });

      let lastClickedBtn = filterBtn[0];
      filterBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const val = this.innerText.toLowerCase();
          if (selectValue) selectValue.innerText = this.innerText;
          filterFunc(val);
          if (lastClickedBtn) lastClickedBtn.classList.remove("active");
          this.classList.add("active");
          lastClickedBtn = this;
        });
      });

      // Navigation
      const navigationLinks = document.querySelectorAll("[data-nav-link]");
      const pages = document.querySelectorAll("[data-page]");

      const activatePage = (pageName) => {
        pages.forEach((p) => {
          if (p.dataset.page === pageName) p.classList.add("active");
          else p.classList.remove("active");
        });
        navigationLinks.forEach((btn) => {
          if (btn.textContent.trim().toLowerCase() === pageName) btn.classList.add("active");
          else btn.classList.remove("active");
        });
        window.scrollTo(0, 0);
      };

      navigationLinks.forEach((btn) => {
        btn.addEventListener("click", function () {
          const target = this.textContent.trim().toLowerCase();
          activatePage(target);
        });
      });

      // Initialize default
      const initiallyActive = Array.from(navigationLinks).find((b) => b.classList.contains("active"));
      if (initiallyActive) {
        activatePage(initiallyActive.textContent.trim().toLowerCase());
      } else {
        activatePage("about");
      }
    });