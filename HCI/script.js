
(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function fly(emoji) {
    var s = document.createElement("span");
    s.className = "fly";
    s.textContent = emoji;
    s.style.left = (20 + Math.random() * 60) + "vw";
    s.style.top = (40 + Math.random() * 30) + "vh";
    document.body.appendChild(s);
    setTimeout(function () {
      s.remove();
    }, 1300);
  }

  // TYPING ANIMATION
  var roles = [
    "I pour coffee ☕",
    "I spike volleyballs 🏐",
    "I build databases 💻",
    "I never stop learning ✨"
  ];

  var ri = 0;
  var ci = 0;
  var del = false;
  var typing = $("type");

  function tick() {
    var word = roles[ri];
    typing.textContent = word.slice(0, ci);

    if (!del && ci < word.length) {
      ci++;
      setTimeout(tick, 70);
    } else if (!del) {
      del = true;
      setTimeout(tick, 1100);
    } else if (ci > 0) {
      ci--;
      setTimeout(tick, 35);
    } else {
      del = false;
      ri = (ri + 1) % roles.length;
      setTimeout(tick, 250);
    }
  }

  tick();

  // SCROLL REVEAL AND COUNTERS
  function countUp(element) {
    var number = +element.dataset.n;
    var current = 0;

    var interval = setInterval(function () {
      current += Math.ceil(number / 30);

      if (current >= number) {
        current = number;
        clearInterval(interval);
      }

      element.textContent = current;
    }, 40);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");

        entry.target.querySelectorAll(".fill").forEach(function (fill) {
          fill.style.width = fill.dataset.w + "%";
        });

        entry.target.querySelectorAll("[data-n]").forEach(countUp);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(function (section) {
    observer.observe(section);
  });

  // ========================================
  // INTERACTIVE BARISTA LAB
  // ========================================

  var HEART =
    '<path d="M40 56 C18 40 24 24 34 26 C38 27 40 31 40 31 C40 31 42 27 46 26 C56 24 62 40 40 56Z" fill="#6f4528"/>';

  var LEAF =
    '<g fill="none" stroke="#6f4528" stroke-width="3" stroke-linecap="round">' +
    '<path d="M26 50 Q40 40 54 50"/>' +
    '<path d="M28 42 Q40 32 52 42"/>' +
    '<path d="M31 34 Q40 26 49 34"/>' +
    '<path d="M40 26 L40 60"/>' +
    '</g>';

  // Available drinks and their visual appearance
  var drinks = {
    "Latte": {
      c: "#7a4a2a",
      cof: 32,
      milk: 50,
      foam: 12,
      fc: "#fbeed9",
      d: "Double espresso, silky milk, and a little latte art.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#7a4a2a"/>' +
        '<circle cx="40" cy="40" r="29" fill="#fbeed9"/>' +
        HEART
    },

    "Cappuccino": {
      c: "#6a3d20",
      cof: 30,
      milk: 30,
      foam: 34,
      fc: "#fbeed9",
      d: "Bold espresso with steamed milk and a thick cloud of foam.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#6a3d20"/>' +
        '<circle cx="40" cy="40" r="29" fill="#fbeed9"/>' +
        LEAF
    },

    "Flat White": {
      c: "#704326",
      cof: 35,
      milk: 57,
      foam: 5,
      fc: "#fbeed9",
      d: "A strong espresso base with silky microfoam and a smooth finish.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#704326"/>' +
        '<circle cx="40" cy="40" r="29" fill="#fbeed9"/>' +
        HEART
    },

    "Americano": {
      c: "#3b1d0e",
      cof: 82,
      milk: 0,
      foam: 4,
      fc: "#b97a43",
      d: "Espresso opened up with hot water—simple, clean, and bold.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#3b1d0e"/>' +
        '<circle cx="40" cy="40" r="24" fill="#b97a43" opacity=".7"/>'
    },

    "Mocha": {
      c: "#4b2415",
      cof: 35,
      milk: 45,
      foam: 18,
      fc: "#fbeed9",
      d: "Chocolate, espresso, and milk in one cozy cup.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#4b2415"/>' +
        '<circle cx="40" cy="40" r="29" fill="#fbeed9"/>' +
        HEART
    },

    "Cold Brew": {
      c: "#2a140a",
      cof: 80,
      milk: 12,
      foam: 0,
      fc: "#fbeed9",
      cold: 1,
      d: "Slow-steeped, chilled, and extra refreshing.",
      art:
        '<circle cx="40" cy="40" r="35" fill="#2a140a"/>' +
        '<g fill="#ffffff" opacity=".4">' +
        '<rect x="20" y="22" width="20" height="20" rx="4" transform="rotate(14 30 32)"/>' +
        '<rect x="44" y="34" width="18" height="18" rx="4" transform="rotate(-20 53 43)"/>' +
        '<rect x="26" y="46" width="15" height="15" rx="3" transform="rotate(28 33 53)"/>' +
        '</g>'
    }
  };

  var selectedDrink = "Latte";
  var brewBusy = false;
  var brewTimer = null;
  var brewStep = 0;

  // Five animated coffee-making steps
  var brewSteps = [
    {
      icon: "🫘",
      title: "Grinding fresh beans",
      desc: "Grinding the beans to get the right texture and aroma."
    },
    {
      icon: "☕",
      title: "Pulling the espresso",
      desc: "A rich shot is extracted into the cup."
    },
    {
      icon: "🥛",
      title: "Steaming the milk",
      desc: "Heating and aerating milk until it turns silky."
    },
    {
      icon: "🫗",
      title: "Pouring with control",
      desc: "Combining espresso and milk for a balanced drink."
    },
    {
      icon: "🤎",
      title: "Finishing the latte art",
      desc: "A final touch before serving your freshly made coffee."
    }
  ];

  var drinksContainer = $("drinks");

  // Create a button for every drink
  Object.keys(drinks).forEach(function (name) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = name;

    button.onclick = function () {
      if (!brewBusy) {
        pickDrink(name);
      }
    };

    drinksContainer.appendChild(button);
  });

  // Update the order ticket
  function updateOrder() {
    var size = $("cupSize").value;
    var shots = $("shotCount").value;
    var milk = $("milkType").value;
    var sugar = $("sweetness").value;

    var ounces = {
      Small: "8 oz",
      Regular: "12 oz",
      Large: "16 oz"
    };

    $("ticketSize").textContent = size + " · " + ounces[size];

    $("ticketShots").textContent =
      shots + (shots === "1" ? " espresso shot" : " espresso shots");

    $("ticketMilk").textContent = milk;
    $("ticketSugar").textContent = sugar + " sweetness";

    $("dName").textContent = selectedDrink;
    $("dText").textContent = drinks[selectedDrink].d;
  }

  // Change drink and preview its appearance
  function pickDrink(name) {
    selectedDrink = name;

    var drink = drinks[name];

    [].forEach.call(drinksContainer.children, function (button) {
      button.classList.toggle("on", button.textContent === name);
    });

    $("cup").classList.toggle("cold", !!drink.cold);

    $("dName").textContent = name;
    $("dText").textContent = drink.d;

    $("lCof").style.background = drink.c;

    $("lMilk").style.background =
      $("milkType").value === "Oat milk" ? "#e8d3ac" :
      $("milkType").value === "Almond milk" ? "#f0dfbb" :
      "#f1dfc5";

    $("lFoam").style.background = drink.fc;

    $("top").innerHTML =
      '<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" stroke-width="3" style="color:var(--ink)"/>' +
      drink.art;

    if (!brewBusy) {
      $("lCof").style.height = "0";
      $("lMilk").style.height = "0";
      $("lFoam").style.height = "0";

      $("cup").classList.remove("making");

      $("cupStage").classList.remove(
        "steaming",
        "pouring",
        "brew-ready"
      );

      setStatus(
        0,
        "Ready to start",
        "Pick your drink and let’s get brewing.",
        "☕"
      );

      $("brewState").textContent = "BARISTA STATION · READY";
      $("brewMessage").textContent =
        "Your cup is empty. Let’s make something good.";
    }

    updateOrder();
  }

  // Update the brewing progress display
  function setStatus(number, title, description, icon) {
    $("stepTitle").textContent = title;
    $("stepDescription").textContent = description;
    $("stepIcon").textContent = icon;

    $("progressLabel").textContent = number + " of 5 steps";
    $("progressPercent").textContent =
      Math.round(number / 5 * 100) + "%";

    $("brewProgress").style.width = (number / 5 * 100) + "%";
  }

  // Listen for changes to the drink options
  ["cupSize", "shotCount", "milkType", "sweetness"].forEach(function (id) {
    $(id).addEventListener("change", function () {
      updateOrder();

      if (id === "milkType") {
        $("lMilk").style.background =
          this.value === "Oat milk" ? "#e8d3ac" :
          this.value === "Almond milk" ? "#f0dfbb" :
          "#f1dfc5";
      }
    });
  });

  // Start making coffee
  function startBrew() {
    if (brewBusy) return;

    brewBusy = true;
    brewStep = 0;

    updateOrder();

    $("startBrew").disabled = true;
    $("startBrew").textContent = "BREWING…";

    $("brewState").textContent = "BARISTA STATION · WORKING";
    $("cup").classList.add("making");
    $("cupStage").classList.remove("brew-ready");

    $("brewMessage").textContent =
      "Stay close—your coffee is being made.";

    runBrewStep();
  }

  // Run each brewing step
  function runBrewStep() {
    var drink = drinks[selectedDrink];
    var step = brewSteps[brewStep];

    setStatus(
      brewStep,
      step.title,
      step.desc,
      step.icon
    );

    $("brewState").textContent =
      "STEP " + (brewStep + 1) + " / 5 · IN PROGRESS";

    $("cupStage").classList.toggle("steaming", brewStep === 2);

    $("cupStage").classList.toggle(
      "pouring",
      brewStep === 1 || brewStep === 3
    );

    // Step 2: espresso
    if (brewStep === 1) {
      $("lCof").style.height = Math.max(20, drink.cof) + "%";
      $("lCof").style.background = drink.c;
    }

    // Step 3: milk
    if (brewStep === 2) {
      $("lMilk").style.height = drink.milk + "%";

      $("lMilk").style.background =
        $("milkType").value === "Oat milk" ? "#e8d3ac" :
        $("milkType").value === "Almond milk" ? "#f0dfbb" :
        "#f1dfc5";
    }

    // Step 4: foam and latte art
    if (brewStep === 3) {
      $("lFoam").style.height = drink.foam + "%";

      $("top").innerHTML =
        '<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" stroke-width="3" style="color:var(--ink)"/>' +
        drink.art;
    }

    // Step 5: serve the coffee
    if (brewStep === 4) {
      $("cupStage").classList.remove("steaming", "pouring");
      $("cup").classList.remove("making");
      $("cupStage").classList.add("brew-ready");

      $("top").classList.remove("pop");
      void $("top").getBoundingClientRect();
      $("top").classList.add("pop");

      for (var i = 0; i < 5; i++) {
        setTimeout(function () {
          fly(selectedDrink === "Cold Brew" ? "🧊" : "☕");
        }, i * 130);
      }
    }

    brewTimer = setTimeout(function () {
      if (brewStep < 4) {
        brewStep++;
        runBrewStep();
      } else {
        brewBusy = false;

        $("startBrew").disabled = false;
        $("startBrew").innerHTML = 'MAKE ANOTHER <span>↗</span>';

        $("brewState").textContent = "BARISTA STATION · SERVED";

        setStatus(
          5,
          "Your coffee is ready!",
          "Made fresh, just the way you ordered it.",
          "✨"
        );

        $("brewMessage").textContent =
          "Order up! Enjoy your " +
          selectedDrink.toLowerCase() +
          "—made with care.";

        $("cup").classList.remove("making");
        $("cupStage").classList.remove("steaming", "pouring");
      }
    }, brewStep === 4 ? 700 : 1050);
  }

  // Reset the coffee station
  function resetBrew() {
    if (brewTimer) {
      clearTimeout(brewTimer);
    }

    brewBusy = false;
    brewStep = 0;

    $("startBrew").disabled = false;
    $("startBrew").innerHTML = 'MAKE MY COFFEE <span>↗</span>';

    $("lCof").style.height = "0";
    $("lMilk").style.height = "0";
    $("lFoam").style.height = "0";

    $("cup").classList.remove("making");

    $("cupStage").classList.remove(
      "steaming",
      "pouring",
      "brew-ready"
    );

    $("brewState").textContent = "BARISTA STATION · READY";

    setStatus(
      0,
      "Ready to start",
      "Pick your drink and let’s get brewing.",
      "☕"
    );

    $("brewMessage").textContent =
      "Your cup is empty. Let’s make something good.";

    pickDrink(selectedDrink);
  }

  $("startBrew").addEventListener("click", startBrew);
  $("resetBrew").addEventListener("click", resetBrew);

  // Initialize the coffee station
  pickDrink("Latte");

  // ========================================
  // VOLLEYBALL MINI GAME
  // ========================================

  var canvas = $("cv");
  var ctx = canvas.getContext("2d");

  var W = 600;
  var H = 220;
  var dpr = window.devicePixelRatio || 1;

  function sizeCanvas() {
    W = canvas.clientWidth || 600;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);

  var score = 0;
  var streak = 0;
  var best = 0;

  var S = {
    st: "toss",
    t: 0,
    jump: -1,
    bx: 0,
    by: 0,
    vx: 0,
    vy: 0,
    f: null,
    trail: [],
    parts: [],
    wait: 0,
    shake: 0,
    flash: 0
  };

  function css(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name).trim() || "#888";
  }

  var FLOOR = H - 28;
  var NETTOP = H - 118;
  var SWEET0 = 34;
  var SWEET1 = 88;

  function playerX() {
    return W * .2;
  }

  function netX() {
    return W * .5;
  }

  function setMessage(message) {
    $("msg").textContent = message;
  }

  // Time the spike
  function spike() {
    if (S.st !== "toss") return;

    S.jump = 0;

    var good = S.by <= SWEET1;
    S.trail = [];

    if (good) {
      S.st = "hit";

      S.f = {
        t: 0,
        dur: .5,
        x0: S.bx,
        y0: S.by,
        x1: W * .82,
        y1: FLOOR - 12
      };
    } else {
      S.st = "net";

      S.f = {
        t: 0,
        dur: .28,
        x0: S.bx,
        y0: S.by,
        x1: netX() - 12,
        y1: NETTOP + 30,
        ph: 1
      };
    }

    S.good = good;
  }

  $("spike").onclick = spike;

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && event.target.tagName !== "BUTTON") {
      event.preventDefault();
      spike();
    }
  });

  canvas.addEventListener("pointerdown", spike);

  // Create particle effects
  function burst(x, y, count, color) {
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * 6.28;
      var speed = 60 + Math.random() * 180;

      S.parts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        l: 1,
        c: color
      });
    }
  }

  function finish(success) {
    if (success) {
      streak++;
      score += 10 * streak;
      best = Math.max(best, score);

      setMessage(
        streak > 2
          ? "🔥 Unstoppable! Kill block!"
          : "✅ Clean spike!"
      );

      S.shake = .25;
      S.flash = 1;

      burst(S.bx, S.by, 26, "#ff8a3d");
    } else {
      streak = 0;
      setMessage("❌ Into the net! Reset and try again.");
      burst(S.bx, S.by, 10, "#7aa6ff");
    }

    $("score").textContent = score;
    $("streak").textContent = streak;
    $("best").textContent = best;

    S.st = "wait";
    S.wait = .8;
  }

  var last = performance.now();

  function frame(now) {
    var dt = Math.min(.04, (now - last) / 1000);
    last = now;

    var speed = Math.min(8.5, 3.1 + streak * .55);

    if (S.st === "toss") {
      S.t += dt * speed;

      S.bx = playerX() + 20;

      S.by =
        SWEET0 - 10 +
        ((FLOOR - 80) - (SWEET0 - 10)) *
        (.5 + .5 * Math.sin(S.t));
    }

    if (S.jump >= 0) {
      S.jump += dt / .42;

      if (S.jump > 1) {
        S.jump = -1;
      }
    }

    if (S.st === "hit") {
      var f = S.f;

      f.t += dt;

      var p = Math.min(1, f.t / f.dur);

      S.bx = f.x0 + (f.x1 - f.x0) * p;
      S.by = f.y0 + (f.y1 - f.y0) * p * p * .9
        + (f.y1 - f.y0) * .1 * p;

      S.trail.push([S.bx, S.by]);

      if (S.trail.length > 9) {
        S.trail.shift();
      }

      if (p >= 1) {
        finish(true);
      }
    }

    if (S.st === "net") {
      var g = S.f;

      if (g.ph === 1) {
        g.t += dt;

        var q = Math.min(1, g.t / g.dur);

        S.bx = g.x0 + (g.x1 - g.x0) * q;
        S.by = g.y0 + (g.y1 - g.y0) * q;

        if (q >= 1) {
          g.ph = 2;
          S.vx = -90;
          S.vy = -60;
          S.shake = .15;
        }
      } else {
        S.vy += 900 * dt;
        S.bx += S.vx * dt;
        S.by += S.vy * dt;

        if (S.by >= FLOOR - 12) {
          S.by = FLOOR - 12;
          finish(false);
        }
      }
    }

    if (S.st === "wait") {
      S.wait -= dt;

      if (S.wait <= 0) {
        S.st = "toss";
        S.trail = [];
      }
    }

    S.parts.forEach(function (particle) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 500 * dt;
      particle.l -= dt * 1.6;
    });

    S.parts = S.parts.filter(function (particle) {
      return particle.l > 0;
    });

    if (S.shake > 0) S.shake -= dt;
    if (S.flash > 0) S.flash -= dt * 3;

    draw();
    requestAnimationFrame(frame);
  }

  // Draw the volleyball court and animation
  function draw() {
    var ink = css("--ink");
    var line = css("--line");
    var net = css("--net");
    var accent = css("--accent");
    var card = css("--card");

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    if (S.shake > 0) {
      ctx.translate(
        (Math.random() - .5) * 6,
        (Math.random() - .5) * 6
      );
    }

    var gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, card);
    gradient.addColorStop(1, line);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = line;
    ctx.fillRect(0, FLOOR, W, H - FLOOR);

    ctx.strokeStyle = ink;
    ctx.globalAlpha = .3;
    ctx.beginPath();
    ctx.moveTo(0, FLOOR);
    ctx.lineTo(W, FLOOR);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Target zone
    ctx.fillStyle = "#ff5d5d33";
    ctx.fillRect(W * .7, FLOOR - 3, W * .25, 3);

    // Green timing zone
    ctx.fillStyle = "#2ecc7140";
    ctx.fillRect(
      playerX() - 6,
      SWEET0,
      80,
      SWEET1 - SWEET0
    );

    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = "#2ecc71";
    ctx.strokeRect(
      playerX() - 6,
      SWEET0,
      80,
      SWEET1 - SWEET0
    );
    ctx.setLineDash([]);

    ctx.fillStyle = "#2ecc71";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SWEET SPOT", playerX() - 2, SWEET0 - 5);

    // Net
    ctx.strokeStyle = net;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(netX(), NETTOP - 8);
    ctx.lineTo(netX(), FLOOR);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.globalAlpha = .55;

    for (var y = NETTOP; y < FLOOR - 20; y += 9) {
      ctx.beginPath();
      ctx.moveTo(netX() - 14, y);
      ctx.lineTo(netX() + 14, y);
      ctx.stroke();
    }

    for (var x = -14; x <= 14; x += 7) {
      ctx.beginPath();
      ctx.moveTo(netX() + x, NETTOP);
      ctx.lineTo(netX() + x, FLOOR - 20);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(netX() - 15, NETTOP);
    ctx.lineTo(netX() + 15, NETTOP);
    ctx.stroke();

    // Player character
    var jumpHeight =
      S.jump >= 0 ? Math.sin(S.jump * Math.PI) * 58 : 0;

    var X = playerX() - 30;
    var swinging = S.jump > .15 && S.jump < .8;

    ctx.strokeStyle = ink;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.fillStyle = accent;

    // Body
    ctx.beginPath();
    ctx.moveTo(X, FLOOR - 36 - jumpHeight);
    ctx.lineTo(X, FLOOR - 70 - jumpHeight);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(X, FLOOR - 36 - jumpHeight);
    ctx.lineTo(X - 9, FLOOR - jumpHeight);

    ctx.moveTo(X, FLOOR - 36 - jumpHeight);
    ctx.lineTo(X + 9, FLOOR - jumpHeight);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(X, FLOOR - 64 - jumpHeight);

    if (swinging) {
      ctx.lineTo(X + 24, FLOOR - 96 - jumpHeight);
    } else if (S.jump >= 0) {
      ctx.lineTo(X + 10, FLOOR - 96 - jumpHeight);
    } else {
      ctx.lineTo(X + 14, FLOOR - 48);
    }

    ctx.moveTo(X, FLOOR - 64 - jumpHeight);

    ctx.lineTo(
      S.jump >= 0 ? X - 12 : X - 14,
      S.jump >= 0 ? FLOOR - 92 - jumpHeight : FLOOR - 48 - jumpHeight
    );

    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(X, FLOOR - 82 - jumpHeight, 11, 0, 6.28);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = ink;
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("JE", X, FLOOR - 48 - jumpHeight);

    // Ball trail
    S.trail.forEach(function (point, index) {
      ctx.globalAlpha = index / S.trail.length * .4;
      ctx.fillStyle = accent;
      ctx.beginPath();

      ctx.arc(
        point[0],
        point[1],
        11 * (index / S.trail.length),
        0,
        6.28
      );

      ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Ball shadow
    ctx.fillStyle = "#0003";
    ctx.beginPath();
    ctx.ellipse(S.bx, FLOOR + 6, 10, 3, 0, 0, 6.28);
    ctx.fill();

    // Volleyball
    ctx.font = "26px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = ink;

    ctx.save();
    ctx.translate(S.bx, S.by);
    ctx.rotate(S.t * 2 + (S.st === "toss" ? 0 : S.t));
    ctx.fillText("🏐", 0, 1);
    ctx.restore();

    ctx.textBaseline = "alphabetic";

    // Particle effects
    S.parts.forEach(function (particle) {
      ctx.globalAlpha = Math.max(0, particle.l);
      ctx.fillStyle = particle.c;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, 6.28);
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Success flash
    if (S.flash > 0) {
      ctx.globalAlpha = S.flash * .35;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  requestAnimationFrame(frame);

  // ========================================
  // 45-SECOND VISITOR TIMER
  // ========================================

  var seconds = 0;
  var bar = $("bar");
  var timer = $("timer");
  var toast = $("toast");
  var shown = false;

  var interval = setInterval(function () {
    seconds++;

    if (seconds <= 45) {
      bar.style.width = (seconds / 45 * 100) + "%";
      timer.textContent = "⏱ " + seconds + "s / 45s";
    }

    if (seconds === 45 && !shown) {
      shown = true;

      toast.classList.add("show");
      timer.textContent = "🎉 You made it!";

      for (var i = 0; i < 8; i++) {
        setTimeout(function () {
          fly(Math.random() > .5 ? "☕" : "🏐");
        }, i * 120);
      }

      clearInterval(interval);
    }
  }, 1000);

  $("close").onclick = function () {
    toast.classList.remove("show");
  };
})();
