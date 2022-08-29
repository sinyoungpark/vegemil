/*menu-icon 클릭시 */
const ControlGnb = () => {
  const target = document.querySelector("nav");
  document.getElementById("menu-icon").addEventListener("click", (e) => {
    e.preventDefault();
    target.classList.contains("responsive") ? target.classList.remove("responsive") : target.classList.add("responsive");
  });
}

ControlGnb();


/*header scroll 시 background 변경*/
const scrollHeader = () => {
  window.addEventListener("scroll", function(e){
    $header = document.querySelector("header");
    let length = this.scrollY;
    if(length >= 100){
        $header.classList.add("headerDown");
    } else {
        $header.classList.remove("headerDown");
    }
  });
}
scrollHeader();