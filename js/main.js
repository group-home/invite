/* =============================================
   한국장애인공동생활가정협회 설립추진위원회 창립 초대장
   ============================================= */
(function () {
  'use strict';

  /* -----------------------------------------
     Typed animation (per-character reveal)
     ----------------------------------------- */
  function splitToChars(el) {
    var text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    var chars = [];
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'char';
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
      el.appendChild(span);
      chars.push(span);
    }
    return chars;
  }

  function revealChars(chars, speed, callback) {
    var i = 0;
    function step() {
      if (i < chars.length) {
        chars[i].classList.add('is-visible');
        i++;
        setTimeout(step, speed);
      } else if (callback) {
        setTimeout(callback, 400);
      }
    }
    step();
  }

  function revealHeroContent() {
    var reveals = document.querySelectorAll('.hero-reveal');
    reveals.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, i * 300);
    });
  }

  var line1 = document.getElementById('typed-line1');
  var line2 = document.getElementById('typed-line2');

  if (line1 && line2) {
    var chars1 = splitToChars(line1);
    var chars2 = splitToChars(line2);

    // 타이틀 fade-in 이후 타이핑 시작
    setTimeout(function () {
      revealChars(chars1, 100, function () {
        revealChars(chars2, 100, revealHeroContent);
      });
    }, 1400);
  }

  /* -----------------------------------------
     Cherry blossom petals
     ----------------------------------------- */
  function initPetals() {
    var container = document.getElementById('petals');
    if (!container) return;

    function rand(min, max) { return min + Math.random() * (max - min); }

    function createPetal() {
      var petal = document.createElement('div');
      petal.className = 'petal';

      var size = rand(8, 16);
      var fallDur = rand(8, 14);
      var swayDur = rand(4, 7);
      var spinDur = rand(4, 10);
      var swayX = rand(10, 30);
      var spinEnd = (Math.random() > 0.5 ? 1 : -1) * rand(180, 720);

      petal.style.left = rand(-5, 105) + '%';
      petal.style.width = size + 'px';
      petal.style.height = (size * rand(1.0, 1.3)) + 'px';
      petal.style.setProperty('--fall-dur', fallDur + 's');
      petal.style.setProperty('--sway-dur', swayDur + 's');
      petal.style.setProperty('--sway-delay', rand(0, 1) + 's');
      petal.style.setProperty('--sway-x', (Math.random() > 0.5 ? swayX : -swayX) + 'px');
      petal.style.setProperty('--spin-dur', spinDur + 's');
      petal.style.setProperty('--spin-end', spinEnd + 'deg');
      petal.style.opacity = '0';

      container.appendChild(petal);

      setTimeout(function () {
        petal.remove();
      }, fallDur * 1000 + 200);
    }

    // 초기 꽃잎 (시차 등장)
    for (var i = 0; i < 10; i++) {
      setTimeout(createPetal, i * 600);
    }

    // 지속적으로 생성
    setInterval(createPetal, 1000);
  }

  initPetals();

  /* -----------------------------------------
     Copy address + toast
     ----------------------------------------- */
  var copyBtn = document.getElementById('copy-address');
  var toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var address = '서울시 영등포구 의사당대로 22 이룸센터';
      navigator.clipboard.writeText(address).then(function () {
        if (!toast) return;
        toast.textContent = '주소를 복사했어요.';
        toast.classList.add('is-visible');
        setTimeout(function () {
          toast.classList.remove('is-visible');
        }, 2000);
      }).catch(function () {});
    });
  }

  /* -----------------------------------------
     Accessibility: TTS (screen reader)
     ----------------------------------------- */
  var ttsBtn = document.getElementById('btn-tts');
  var ttsPlayed = false;
  if (ttsBtn) {
    ttsBtn.addEventListener('click', function () {
      if (ttsPlayed || (window.speechSynthesis && window.speechSynthesis.speaking)) {
        if (toast) {
          toast.textContent = '음성이 재생중이에요.';
          toast.classList.add('is-visible');
          setTimeout(function () { toast.classList.remove('is-visible'); }, 2000);
        }
        return;
      }
      if ('speechSynthesis' in window) {
        var synth = window.speechSynthesis;
        ttsPlayed = true;
        ttsBtn.classList.add('a11y-btn--disabled');
        var text =
          '2026년 3월 27일, 새로운 희망의 문을 여는 자리 ' +
          '한국장애인공동생활가정협회의 창립총회 및 기념세미나에 여러분을 초대합니다. ' +
          '행사는 이룸센터에서 1시 반 부터 4시 반까지 진행돼요. ' +
          '1981년 처음 걸음을 뗀 장애인공동생활가정은, ' +
          '그동안 장애인의 자립과 더 나은 삶을 돕는 소중한 역할을 해왔어요. ' +
          '이제 전국의 시설이 마음을 모아 현장의 목소리를 더 크게 내고 깊게 소통하기 위해 ' +
          '한국장애인공동생활가정협회를 새롭게 시작하려고 해요. ' +
          '우리가 함께한 시간이 따뜻한 희망이 되었듯, 앞으로 함께할 내일은 더 큰 변화가 될 거에요. ' +
          '뜻깊은 첫출발의 자리에 오셔서 꼭 함께 축하해 주세요. ' +
          '한국장애인공동생활가정협회 설립추진위원회 드림';
        var utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ko-KR';
        utter.rate = 0.7;
        synth.speak(utter);
      }
    });
  }

  /* -----------------------------------------
     Accessibility: High contrast mode
     ----------------------------------------- */
  var contrastBtn = document.getElementById('btn-contrast');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', function () {
      document.body.classList.toggle('high-contrast');
    });
  }

  /* -----------------------------------------
     Scroll animations (AOS replacement)
     ----------------------------------------- */
  function initScrollObserver() {
    var targets = document.querySelectorAll('[data-aos]');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  initScrollObserver();



})();
