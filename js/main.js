/*menu-icon 클릭시 */
const ControlGnb = () => {
  const target = document.getElementsByTagName("nav");
  document.getElementById("#menu-icon").addEventListener("click", (e) => {
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

  $slide.append($cloneFirst);
  $slide.prepend($cloneLast);

  const slideWidth = 1920;
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


/*tab */
const tab = () => {
  let $contents = document.querySelectorAll(".content");
  const $tabs = document.querySelectorAll(".tabs li");
  [...$contents][0].classList.add("select");
  
  document.querySelector(".tabs li:nth-child(1)").classList.add("select");
  
  let changeContent = (index) => {
      [...$tabs].forEach((ele) => {
          ele.classList.remove("select");
      });
      [...$tabs][index].classList.add("select");
      [...$contents].forEach((ele) => {
          ele.classList.remove("select");
      });
      [...$contents][index].classList.add("select");
  }
  
  $tabs.forEach((ele) => {
      ele.addEventListener("click", (e) => changeContent(e.target.value));
  });
}
tab();

/*시간 배너 */
const timeDesign = () => {
    let today = new Date();
    let H = today.getHours();
    
    if(H >= 9 && H <= 18){
      document.getElementById("day").style.display = "block";
      document.getElementById("night").style.display = "none";
    } else{
      document.getElementById("night").style.display = "block";
      document.getElementById("day").style.display = "none";
  }
}
timeDesign();
setInterval(timeDesign, 1000);


/*대표제품 드래그 */
const dragProduct = () => {
  let $dragTarget = document.querySelector(".main-products");
  let winWidth = window.innerWidth - 500;
  let $links = document.querySelectorAll(".main-products a");
  [...$links].forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
  //링크 이동 막기

  $dragTarget.addEventListener("mousedown", (e) => {
    let offset = e.currentTarget.offsetLeft;
    fx = e.pageX - offset;
    fnMouseMove();
  });

  const fnMouseMove = () => {
    let $html = document.querySelector("html");

    const handleMouseMove = (e) => {
      e.preventDefault();
      let newX = e.pageX - fx;
      let targetWidth = Number(window.getComputedStyle($dragTarget).width.slice(0,-2));
      let maxLeft = targetWidth - winWidth;
      let minLeft = 0

      newX < -maxLeft ? newX = -maxLeft : false;
      newX > minLeft ? newX = minLeft : false;
      $dragTarget.style.left = `${newX}px`; 
    }

    $html.addEventListener("mousemove", handleMouseMove);

    $html.addEventListener("mouseup",(e) => {
      e.currentTarget.removeEventListener("mousemove", handleMouseMove);
    })
  }
}

dragProduct();
/*sect01 .sect02 scroll event */
const scrollHandler = () => {
  window.addEventListener("scroll", () => {
    let pos = window.scrollY;
    let target1 = document.querySelector("#sect01 .right");
    let target2 = document.querySelector("#sect02 .left");
    let target3 = document.querySelector(".line");
    //500일때 작은 사이즈, 
    //800일 때 큰사이즈.
    pos >= 400 ? target1.classList.add("on"): target1.classList.remove("on");
    pos >=1500 ? target2.classList.add("on"): target2.classList.remove("on");
    pos >= 2300 ? target3.classList.add("on"): target3.classList.remove("on");
  });
}
scrollHandler();


/*모달 */
const modal = () => {
  document.getElementById("close").addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
  });
}
modal();

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

/*scroll smooth */
/*
const scorllEvent = () => {
  const $html = document.querySelector("html");
  const pos01 = document.querySelector("#main-visual-area");
  const pos02 = document.querySelector("#sect01").offsetTop;
  const pos03 = document.querySelector("#sect03").offsetTop;
  const pos04 = document.querySelector("#sect04").offsetTop;

  $html.scrollTo({
    top : pos02,
    behavior : "smooth"
  });
  let scrollPos = $html.scrollTop;
  $html.addEventListener("scroll", () => {
    console.log("Scroll");
    $html.scrollTo({
      top : pos02,
      behavior : "smooth"
    });
  });
}

scorllEvent();
*/

