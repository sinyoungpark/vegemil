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


/*모달 */
const modal = () => {
  document.getElementById("close").addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
  });
}
modal();



/*다시보지 않기 쿠키 생성*/
const cookieHandler = () => {

  const $repeatBtn = document.querySelector("#repeat");
  const $modal = document.getElementById("modal");
  let cookiedata = document.cookie;

  cookiedata.indexOf("close=Y") < 0 ?  $modal.style.display = "display" :  $modal.style.display = "none";

  const setCookie = (name, value, exdays) => {
    //input : 쿠키이름, 쿠키값, 종료일 
    let today = new Date();
    today.setTime(today.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + today.toUTCString();
    document.cookie = name + "=" + value + ";" + expires;
  }
  
  
  $repeatBtn.addEventListener("click", () => {
    setCookie("close", "Y", 1);
    $modal.style.display = "none";
  });
}

cookieHandler();


/*slide*/
const slideMove = () => {
  const $slide = document.querySelector(".slide-list");
  const $pauseBtn = document.querySelector(".pause-btn");
  const $next = document.querySelector("#next-btn");
  const $prev = document.querySelector("#prev-btn");

  let $slides = document.querySelectorAll(".slide-list li");
  let total = [...$slides].length - 1;
  let cur = 1;
  let timer;

  //뒤에 차일드 앞에 붙이고, 앞의 차일드 뒤에 붙이기 
  let $cloneFirst = $slides[0].cloneNode(true);
  let $cloneLast = $slides[total].cloneNode(true);
  let slideWidth = window.innerWidth;

  $slide.append($cloneFirst);
  $slide.prepend($cloneLast);

  /*resizing 시 window.ourterWidth 구함 */
  window.addEventListener("resize", (e) => {
    e.preventDefault();
    slideWidth = window.innerWidth;
  });
  
  console.log(slideWidth);
    //넘겨버리기 
    //console.log(slideWidth);//min-width 속성필요
  $slide.style.transform = `translateX(${slideWidth * cur}px)`;

  //슬라이드 하나당 컨트롤러 생성 
  [...$slides].forEach((ele, idx) => {
    let $controlers = document.createElement("button");
    idx === 0 ? $controlers.classList.add("control-btn", "active") : $controlers.classList.add("control-btn");

    document.querySelector(".control-group").appendChild($controlers);
  });

  const $controlers = document.querySelectorAll(".control-btn");

  //보여주는 함수 : 왼 -> 오 이동
  const fnMove = (idx) => {
    setControlers(idx);
    $slide.style.transform = `translateX(${slideWidth * idx}px)`;
    $slide.style.transition = `1s`;
    //컨트롤러 지정
    cur = idx;
  }

  const setControlers = (idx) => {
    document.querySelector(".control-btn.active").classList.remove("active");
    idx >= 5 ? [...$controlers][0].classList.add("active") : [...$controlers][idx - 1].classList.add("active");
  }

  const setSlide = () => {
    $slides = document.querySelectorAll(".slide");
    cur === [...$slides].length ? fnMove(1) : fnMove(cur + 1); 
  }

  const fnTog = () => {
    timer === 0 ? $pauseBtn.style.backgroundPositionY = "-30px" : $pauseBtn.style.backgroundPositionY = "0px";
  }

  //컨트롤러 클릭하면 
  [...$controlers].forEach((ele, idx) => {
    ele.addEventListener("click", (e) => {
      cur = idx;
      fnMove(idx + 1);
      //클릭한 컨트롤러에 스타일 지정
      document.querySelector(".control-btn.active").classList.remove("active");
      [...$controlers][idx].classList.add("active");

      //자동실행멈춤
      clearInterval(timer);
      timer = 0;
      fnTog();
    });
  });

  $slide.addEventListener("transitionend", () => {
    $slides = document.querySelectorAll(".slide-list li");
    total = [...$slides].length - 1;

    if(cur <= 0){
      $slide.style.transition = "none";
      cur = total - 1;
      $slide.style.transform = `translateX(0px)`;
    }
    if(cur >= total){
      $slide.style.transition = "none";
      cur = 1;
      $slide.style.transform = `translateX(${slideWidth * cur}px)`;
    }
  });

  $pauseBtn.addEventListener("click", () => {
    if(timer) clearInterval(timer)
    timer === 0 ? timer = setInterval(setSlide, 3000) : timer = 0;
    fnTog();
  });

  $next.addEventListener("click", () => {
    clearInterval(timer);
    timer = 0;
    fnTog();
    cur >= total - 1 ? fnMove(1) : fnMove(cur + 1); 
  });

  $prev.addEventListener("click", () => {
    clearInterval(timer);
    timer = 0;
    fnTog();
    cur === 1 ? fnMove(total - 1) : fnMove(cur - 1);
  })

  timer = setInterval(setSlide, 3000);
}

slideMove();


/*chatbot */
const iconHandler = () => {
  const $chatbox = document.querySelector(".chatbox");
  const $chatBtn = document.querySelector("#chatbot");
  
  $chatbox.style.display = "none";

  window.addEventListener("scroll", () => {
    let scrollPos = this.scrollY;
    document.querySelector(".side-icons").style.top = `${750 + scrollPos}px`;
    $chatbox.style.top = `${230 + scrollPos}px`;
  });

  $chatBtn.addEventListener("click", () => {
    $chatbox.style.display === "none" ? $chatbox.style.display = "block" : $chatbox.style.display = "none";
  });
}

iconHandler();
/**up button 클릭시  */
const topHandler = () => {
  $topBtn = document.querySelector("#up");
  $topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top : 0,
      behavior:"smooth",
    });
  });
}
topHandler(); 