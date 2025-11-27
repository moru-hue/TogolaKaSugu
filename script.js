// Scroll doux pour tous les liens internes
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    if(link.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if(target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});