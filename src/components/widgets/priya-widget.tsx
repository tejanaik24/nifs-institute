"use client";

import { useEffect, useRef } from "react";

// Ported from the old static homepage.html course/job finder widget
// ("Priya — NIFS Advisor"). Kept as close to the original working
// vanilla-JS state machine as possible — it's self-contained (own ids,
// own click delegation, own drag logic) and doesn't touch anything else
// on the page, so a faithful port is safer than a rewrite. Only real
// change: dropped the stray 'Montserrat' font-family so it inherits the
// site's font-sans (Inter) instead of introducing a third typeface.
export function PriyaWidget() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    type Course = {
      name: string;
      dur: string;
      elig: string;
      badge: string;
      desc: string;
      goals: string[];
      levels: string[];
      states: string[] | "all";
    };

    const GOALS = [
      { id: "student", icon: "🎓", label: "I am a Student (10th / 12th / Graduate)" },
      { id: "job", icon: "💼", label: "Get a Safety Job / Career Change" },
      { id: "upgrade", icon: "📈", label: "Upgrade My Qualification" },
      { id: "gulf", icon: "✈️", label: "Gulf / International Jobs" },
      { id: "pro", icon: "🏭", label: "Already Working in Industry" },
      { id: "company", icon: "🏢", label: "Company Needs Safety Training" },
    ];

    const LEVELS = [
      { id: "10th", label: "10th Pass" },
      { id: "12th", label: "12th Pass / Intermediate" },
      { id: "diploma", label: "Diploma Holder" },
      { id: "graduate", label: "Graduate (B.Sc / B.E / BA etc.)" },
      { id: "working", label: "Working Professional (any education)" },
    ];

    const STATES = [
      "Andhra Pradesh", "Assam", "Bihar", "Delhi / NCR", "Gujarat", "Haryana",
      "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
      "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other State",
    ];

    const COURSES: Course[] = [
      { name: "Diploma in Fire & Safety", dur: "1 Year", elig: "10th Pass & above", badge: "Most Popular", desc: "Entry-level NSDC approved qualification. Ideal first step into the fire safety industry.", goals: ["job", "student"], levels: ["10th", "12th", "diploma"], states: "all" },
      { name: "Advanced Diploma in Fire & Safety", dur: "2 Years", elig: "12th Pass & above", badge: "Best Value", desc: "70% practical training. Opens doors to safety officer roles across all industries.", goals: ["job", "student", "upgrade"], levels: ["12th", "diploma", "graduate"], states: "all" },
      { name: "B.Sc in Fire & Industrial Safety", dur: "3 Years (6 Semesters)", elig: "12th (any stream)", badge: "Degree Program", desc: "University-affiliated 3-year degree. Government job eligible.", goals: ["student", "upgrade"], levels: ["12th"], states: "all" },
      { name: "B.Sc (Honours) in Fire & Industrial Safety", dur: "4 Years (8 Semesters)", elig: "12th (any stream)", badge: "Honours Degree", desc: "Advanced 4-year honours degree with specialized research & internship.", goals: ["student", "upgrade"], levels: ["12th"], states: "all" },
      { name: "PG Diploma in Industrial Safety", dur: "1 Year", elig: "Any Graduate", badge: "Post-Graduate", desc: "For graduates specialising in industrial safety management. High demand in manufacturing.", goals: ["upgrade", "pro"], levels: ["graduate", "working"], states: "all" },
      { name: "NEBOSH IGC", dur: "3 Months", elig: "12th Pass & above", badge: "International", desc: "Global gold standard. Mandatory for Gulf, UK & international safety jobs. Internationally recognised.", goals: ["gulf", "pro"], levels: ["12th", "diploma", "graduate", "working"], states: "all" },
      { name: "IOSH Managing Safely", dur: "4 Days", elig: "Working Professionals", badge: "Fast Track", desc: "UK-recognised certification for supervisors, managers & HSE professionals. Quick and impactful.", goals: ["pro", "company"], levels: ["working", "graduate"], states: "all" },
      { name: "Safety Officer Certification", dur: "3-6 Months", elig: "12th / Diploma holder", badge: "Govt Recognised", desc: "Required for factories, construction & oil sites. Govt approved Safety Officer licence.", goals: ["job", "upgrade"], levels: ["12th", "diploma", "graduate"], states: "all" },
      { name: "ISO 45001 Lead Auditor", dur: "5 Days", elig: "Graduate / Professional", badge: "Auditor Cert", desc: "International auditor cert. High demand in manufacturing, oil & gas, pharma sectors.", goals: ["pro", "company", "upgrade"], levels: ["graduate", "working"], states: "all" },
      { name: "MSBTE Safety Diploma", dur: "1-2 Years", elig: "10th Pass (Maharashtra)", badge: "MSBTE Approved", desc: "Maharashtra State Board approved. Ideal for Maharashtra students seeking government-recognised qualifications.", goals: ["job", "student"], levels: ["10th", "12th"], states: ["Maharashtra"] },
    ];

    const JQUAL = ["10th Pass", "Intermediate / 12th", "ITI", "Diploma", "Graduate", "B.E / B.Tech", "PG / Master's"];
    const JEXP = ["Fresher", "0–2 Years", "2–5 Years", "5–10 Years", "10+ Years"];
    const JIND = ["Manufacturing", "Steel", "Power", "Oil & Gas", "Construction", "Infrastructure", "Ports", "Warehousing & Logistics", "Pharmaceutical", "Renewable Energy", "Automobile", "Open to Any Industry"];
    const JROLE = ["Safety Officer", "Safety Supervisor", "HSE Engineer", "HSE Officer", "Fire Officer", "Fire Marshal", "DCPO", "Safety Manager", "Fire Technician", "Emergency Response Team", "Trainer", "Any Suitable Position"];
    const JLOC = ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Odisha", "Maharashtra", "Gujarat", "Delhi NCR", "PAN India"];
    const JEMP = ["Permanent", "Project", "Shutdown", "Contract", "Any"];
    const JSAL = ["Fresher", "₹20,000–30,000", "₹30,000–50,000", "₹50,000–75,000", "₹75,000+", "Negotiable"];
    const JAVAIL = ["Immediately", "Within 7 Days", "Within 15 Days", "Within 30 Days", "Notice Period"];

    const JOB_STEPS = [
      { key: "qual", q: "What is your highest <em>qualification</em>?", opts: JQUAL },
      { key: "exp", q: "How much <em>experience</em> do you have?", opts: JEXP },
      { key: "ind", q: "Which <em>industry</em> would you like to work in?", opts: JIND },
      { key: "role", q: "Select your preferred <em>job role</em>", opts: JROLE },
      { key: "loc", q: "Where would you like to <em>work</em>?", opts: JLOC },
      { key: "emp", q: "Select your <em>employment type</em> preference", opts: JEMP },
      { key: "sal", q: "Expected <em>monthly salary</em>?", opts: JSAL },
      { key: "avail", q: "When can you <em>join</em>?", opts: JAVAIL },
    ] as const;
    const JOB_TOTAL_STEPS = JOB_STEPS.length + 1;

    let sel: { goal: string | null; level: string | null; state: string | null } = { goal: null, level: null, state: null };
    interface JobSelection {
      qual: string; exp: string; ind: string; role: string; loc: string; emp: string; sal: string; avail: string;
      name: string; phone: string; email: string; resume: File | null;
    }
    let jsel: JobSelection = {
      qual: "", exp: "", ind: "", role: "", loc: "", emp: "", sal: "", avail: "",
      name: "", phone: "", email: "", resume: null,
    };
    let jIdx = 0;
    let isOpen = false;

    const $ = (id: string) => document.getElementById(id);
    const panel = () => $("cf-panel")!;
    const bd = () => $("cf-bd")!;
    const dot = (i: number) => {
      for (let k = 0; k < 4; k++) {
        const el = $("d" + k);
        if (!el) continue;
        el.classList.remove("on", "ok");
        if (k < i) el.classList.add("ok");
        else if (k === i) el.classList.add("on");
      }
    };

    function setIndicator(kind: "course" | "job" | null, i = 0, total = 1) {
      const dots = $("cf-dots")!, barWrap = $("cf-barwrap")!, barLabel = $("cf-bar-label")!;
      if (kind === "course") {
        dots.style.display = "flex"; barWrap.style.display = "none"; barLabel.style.display = "none";
        dot(i);
      } else if (kind === "job") {
        dots.style.display = "none"; barWrap.style.display = "block"; barLabel.style.display = "block";
        ($("cf-bar") as HTMLElement).style.width = Math.round(((i + 1) / total) * 100) + "%";
        barLabel.textContent = "Step " + (i + 1) + " of " + total;
      } else {
        dots.style.display = "none"; barWrap.style.display = "none"; barLabel.style.display = "none";
      }
    }

    function showFork() {
      setIndicator(null);
      bd().innerHTML =
        '<div class="cf-q">What are you here for?</div><div class="cf-opts">' +
        '<button class="cf-o" data-action="flow" data-val="course"><span class="cf-oi">🎓</span>Find My Course</button>' +
        '<button class="cf-o" data-action="flow" data-val="job"><span class="cf-oi">💼</span>Find My Job</button>' +
        "</div>";
    }

    function hideTeaser() {
      $("cf-teaser")?.classList.remove("show");
    }

    function showTeaser() {
      if (isOpen) return;
      const t = $("cf-teaser");
      if (!t) return;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 6000);
    }

    function open() {
      hideTeaser();
      const p = panel();
      p.classList.remove("cf-hide");
      p.classList.add("cf-show");
      isOpen = true;
      sel = { goal: null, level: null, state: null };
      jsel = { qual: "", exp: "", ind: "", role: "", loc: "", emp: "", sal: "", avail: "", name: "", phone: "", email: "", resume: null };
      jIdx = 0;
      showFork();
    }

    function close() {
      const p = panel();
      p.classList.remove("cf-show");
      p.classList.add("cf-hide");
      isOpen = false;
      setTimeout(() => { p.classList.remove("cf-show", "cf-hide"); }, 200);
      setTimeout(showTeaser, 1200);
    }

    function step(n: number) {
      setIndicator("course", n, 4);
      if (n === 0) s0();
      else if (n === 1) s1();
      else if (n === 2) s2();
      else s3();
    }

    function s0() {
      let h = '<div class="cf-q">What is your <em>goal</em>?</div><div class="cf-opts">';
      GOALS.forEach((g) => {
        h += `<button class="cf-o" data-action="goal" data-val="${g.id}"><span class="cf-oi">${g.icon}</span>${g.label}</button>`;
      });
      h += '</div><button class="cf-bk" data-action="back" data-to="fork">← Back</button>';
      bd().innerHTML = h;
    }

    function s1() {
      let h = '<div class="cf-q">Your <em>education level</em>?</div><div class="cf-opts">';
      LEVELS.forEach((l) => {
        h += `<button class="cf-o" data-action="level" data-val="${l.id}">${l.label}</button>`;
      });
      h += '</div><button class="cf-bk" data-action="back" data-to="0">← Back</button>';
      bd().innerHTML = h;
    }

    function s2() {
      let h = '<div class="cf-q">Your <em>state / location</em>?</div>';
      h += '<select class="cf-sel" id="cf-st"><option value="">— Select your state —</option>';
      STATES.forEach((s) => {
        const selected = sel.state === s ? " selected" : "";
        h += `<option value="${s}"${selected}>${s}</option>`;
      });
      h += "</select>";
      const isDis = sel.state ? "" : " disabled";
      h += `<button class="cf-nxt" id="cf-go" data-action="next"${isDis}>Show My Courses →</button>`;
      h += '<button class="cf-bk" data-action="back" data-to="1">← Back</button>';
      bd().innerHTML = h;
      $("cf-st")?.addEventListener("change", function (this: HTMLSelectElement) {
        sel.state = this.value;
        const goBtn = $("cf-go") as HTMLButtonElement | null;
        if (goBtn) goBtn.disabled = !this.value;
      });
    }

    function s3() {
      let matches = COURSES.filter(
        (c) =>
          c.goals.indexOf(sel.goal!) !== -1 &&
          c.levels.indexOf(sel.level!) !== -1 &&
          (c.states === "all" || c.states.indexOf(sel.state!) !== -1)
      );
      if (!matches.length) matches = COURSES.filter((c) => c.goals.indexOf(sel.goal!) !== -1).slice(0, 3);
      matches = matches.slice(0, 3);

      const wab = "https://wa.me/918374340999?text=";
      let h = '<div class="cf-q">🎯 Best courses for <em>you</em></div>';

      if (!matches.length) {
        h +=
          '<div style="text-align:center;padding:16px 0;color:#555;font-size:13px">Our counsellors will guide you personally.<br><br>' +
          '<a href="https://wa.me/918374340999?text=I+need+help+choosing+a+course" target="_blank" class="cf-ap" style="display:block;padding:10px;border-radius:10px;text-decoration:none;font-weight:700">💬 Talk to a Counsellor</a></div>';
      } else {
        matches.forEach((c) => {
          const wt = wab + encodeURIComponent(`Hi, I am interested in ${c.name} (${sel.state}). Please guide me.`);
          h +=
            '<div class="cf-card">' +
            `<div class="cf-badge">${c.badge}</div>` +
            `<div class="cf-cn">${c.name}</div>` +
            `<div class="cf-cm">⏱ ${c.dur} &nbsp;|&nbsp; 🎓 ${c.elig}</div>` +
            `<div class="cf-cd">${c.desc}</div>` +
            '<div class="cf-cbs">' +
            `<a href="${wt}" target="_blank" rel="noopener" class="cf-wa">💬 WhatsApp</a>` +
            '<a href="/admissions" class="cf-ap">Apply Now</a>' +
            "</div></div>";
        });
      }
      h += `<p style="font-size:11px;color:#aaa;text-align:center;margin:8px 0 0">📍 Center in: ${sel.state}</p>`;
      h += '<button class="cf-rst" data-action="restart">↩ Start Over</button>';
      bd().innerHTML = h;
    }

    function jstep(n: number) {
      jIdx = n;
      if (n < JOB_STEPS.length) {
        setIndicator("job", n, JOB_TOTAL_STEPS);
        const cfg = JOB_STEPS[n];
        let h = `<div class="cf-q">${cfg.q}</div><div class="cf-opts">`;
        cfg.opts.forEach((o) => {
          h += `<button class="cf-o" data-action="jset" data-key="${cfg.key}" data-val="${o}">${o}</button>`;
        });
        h += `</div><button class="cf-bk" data-action="jback" data-to="${n === 0 ? "fork" : n - 1}">← Back</button>`;
        bd().innerHTML = h;
      } else {
        setIndicator("job", n, JOB_TOTAL_STEPS);
        jDetailsStep();
      }
    }

    function jDetailsStep() {
      const h =
        '<div class="cf-q">Almost there — <em>your details</em></div>' +
        `<input class="cf-sel" id="jf-name" placeholder="Full Name" value="${jsel.name}">` +
        `<input class="cf-sel" id="jf-phone" placeholder="Phone Number" value="${jsel.phone}">` +
        `<input class="cf-sel" id="jf-email" placeholder="Email (optional)" value="${jsel.email}">` +
        `<label class="cf-file-label" for="jf-resume">📎 ${jsel.resume ? jsel.resume.name : "Attach Resume (PDF/DOC, optional, max 5MB)"}</label>` +
        '<input type="file" id="jf-resume" accept=".pdf,.doc,.docx" style="display:none">' +
        '<p class="cf-hint">Your resume goes straight to our placement team by email. WhatsApp will carry all your answers plus a note that it\'s on the way — WhatsApp links can\'t carry file attachments.</p>' +
        '<div id="jf-err"></div>' +
        '<button class="cf-nxt" data-action="jsubmit">Send My Profile →</button>' +
        `<button class="cf-bk" data-action="jback" data-to="${JOB_STEPS.length - 1}">← Back</button>`;
      bd().innerHTML = h;
      $("jf-resume")?.addEventListener("change", function (this: HTMLInputElement) {
        const f = this.files?.[0];
        if (f && f.size > 5 * 1024 * 1024) {
          $("jf-err")!.innerHTML = '<p class="cf-err">File too large — max 5MB.</p>';
          this.value = "";
          return;
        }
        $("jf-err")!.innerHTML = "";
        jsel.resume = f || null;
        const label = document.querySelector('label[for="jf-resume"]');
        if (label) label.textContent = "📎 " + (f ? f.name : "Attach Resume (PDF/DOC, optional, max 5MB)");
      });
    }

    function jSubmit() {
      jsel.name = ($("jf-name") as HTMLInputElement).value.trim();
      jsel.phone = ($("jf-phone") as HTMLInputElement).value.trim();
      jsel.email = ($("jf-email") as HTMLInputElement).value.trim();
      if (!jsel.name || !jsel.phone) {
        $("jf-err")!.innerHTML = '<p class="cf-err">Please enter your name and phone number.</p>';
        return;
      }

      const msg =
        "*New Job Enquiry from Website*\n" +
        `*Name:* ${jsel.name}\n*Phone:* ${jsel.phone}\n*Email:* ${jsel.email || "Not provided"}\n` +
        `*Qualification:* ${jsel.qual}\n*Experience:* ${jsel.exp}\n*Industry:* ${jsel.ind}\n*Role:* ${jsel.role}\n` +
        `*Location:* ${jsel.loc}\n*Employment Type:* ${jsel.emp}\n*Salary Expectation:* ${jsel.sal}\n*Availability:* ${jsel.avail}` +
        (jsel.resume ? "\n*Resume:* Attached — sent via email" : "");

      const fd = new FormData();
      fd.append("name", jsel.name);
      fd.append("phone", jsel.phone);
      fd.append("email", jsel.email || "Not provided");
      fd.append("qualification", jsel.qual);
      fd.append("experience", jsel.exp);
      fd.append("industry", jsel.ind);
      fd.append("role", jsel.role);
      fd.append("location", jsel.loc);
      fd.append("employment_type", jsel.emp);
      fd.append("salary_expectation", jsel.sal);
      fd.append("availability", jsel.avail);
      fd.append("_subject", "New Job Enquiry from " + jsel.name);
      if (jsel.resume) fd.append("resume", jsel.resume, jsel.resume.name);

      fetch("https://formsubmit.co/ajax/headoffice@nifsindia.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      }).catch((err) => console.error("FormSubmit backup failed:", err));

      window.open("https://wa.me/918374340999?text=" + encodeURIComponent(msg), "_blank");
      jConfirm();
    }

    function jConfirm() {
      setIndicator(null);
      const h =
        '<div class="cf-q">🎉 <em>Profile Sent!</em></div>' +
        `<div style="text-align:center;padding:6px 0 14px;color:#444;font-size:13px;line-height:1.6">Thanks ${jsel.name || "there"} — our placement team has your profile${jsel.resume ? " and resume" : ""}.<br><br>We'll match you with live roles by qualification, industry &amp; location and reach out on WhatsApp shortly.</div>` +
        '<a href="https://wa.me/918374340999" target="_blank" rel="noopener" class="cf-ap" style="display:block;text-align:center;padding:10px;border-radius:10px;text-decoration:none;font-weight:700;margin-bottom:8px">💬 Chat with Placement Team</a>' +
        '<button class="cf-rst" data-action="restart">↩ Start Over</button>';
      bd().innerHTML = h;
    }

    function onDelegatedClick(e: MouseEvent) {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-action]");
      if (!t) return;
      e.stopPropagation();
      const a = t.dataset.action, v = t.dataset.val;
      if (a === "flow") { v === "course" ? step(0) : jstep(0); }
      else if (a === "goal") { sel.goal = v!; step(1); }
      else if (a === "level") { sel.level = v!; step(2); }
      else if (a === "next") { step(3); }
      else if (a === "back") { t.dataset.to === "fork" ? showFork() : step(parseInt(t.dataset.to!)); }
      else if (a === "jset") { (jsel as unknown as Record<string, string>)[t.dataset.key!] = v!; jstep(jIdx + 1); }
      else if (a === "jback") { t.dataset.to === "fork" ? showFork() : jstep(parseInt(t.dataset.to!)); }
      else if (a === "jsubmit") { jSubmit(); }
      else if (a === "restart") {
        sel = { goal: null, level: null, state: null };
        jsel = { qual: "", exp: "", ind: "", role: "", loc: "", emp: "", sal: "", avail: "", name: "", phone: "", email: "", resume: null };
        showFork();
      }
    }
    bd().addEventListener("click", onDelegatedClick);

    // Draggable floating widget — position remembered per browser
    const bubble = $("cf-bubble")!;
    const handle = $("cf-trigger")!;
    const POS_KEY = "nifsCfBubblePos";
    let dragging = false, wasDrag = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    function place(left: number, top: number) {
      const r = bubble.getBoundingClientRect();
      left = clamp(left, 4, Math.max(4, window.innerWidth - r.width - 4));
      top = clamp(top, 4, Math.max(4, window.innerHeight - r.height - 4));
      bubble.style.left = left + "px";
      bubble.style.top = top + "px";
      bubble.style.right = "auto";
      bubble.style.bottom = "auto";
    }

    function restore() {
      let saved: { left: number; top: number } | null = null;
      try { saved = JSON.parse(localStorage.getItem(POS_KEY) || "null"); } catch { saved = null; }
      if (saved && typeof saved.left === "number" && typeof saved.top === "number") place(saved.left, saved.top);
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      wasDrag = false;
      const r = bubble.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      startLeft = r.left; startTop = r.top;
      try { handle.setPointerCapture(e.pointerId); } catch {}
      bubble.classList.add("cf-dragging");
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!wasDrag && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) wasDrag = true;
      if (wasDrag) place(startLeft + dx, startTop + dy);
    }
    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      bubble.classList.remove("cf-dragging");
      if (wasDrag) {
        const r = bubble.getBoundingClientRect();
        try { localStorage.setItem(POS_KEY, JSON.stringify({ left: r.left, top: r.top })); } catch {}
      }
    }
    function onResize() {
      if (bubble.style.left) {
        const r = bubble.getBoundingClientRect();
        place(r.left, r.top);
      }
    }

    handle.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);
    restore();

    function onTriggerClick(e: MouseEvent) {
      e.stopPropagation();
      if (wasDrag) { wasDrag = false; return; }
      isOpen ? close() : open();
    }
    function onCloseClick(e: MouseEvent) {
      e.stopPropagation();
      close();
    }
    function onTeaserXClick(e: MouseEvent) {
      e.stopPropagation();
      hideTeaser();
    }
    function onDocumentClick(e: MouseEvent) {
      if (isOpen && (e.target as Node).isConnected && !bubble.contains(e.target as Node)) close();
    }

    handle.addEventListener("click", onTriggerClick);
    $("cf-x")?.addEventListener("click", onCloseClick);
    $("cf-teaser-x")?.addEventListener("click", onTeaserXClick);
    document.addEventListener("click", onDocumentClick);

    // Auto-open shortly after load, but only the first time a visitor sees the site
    const AUTO_OPEN_KEY = "nifsCfAutoOpened";
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let seenBefore = false;
    try { seenBefore = localStorage.getItem(AUTO_OPEN_KEY) === "1"; } catch { seenBefore = false; }
    if (!seenBefore) {
      openTimer = setTimeout(() => {
        open();
        try { localStorage.setItem(AUTO_OPEN_KEY, "1"); } catch {}
      }, 1500);
    }

    return () => {
      clearTimeout(openTimer);
      bd().removeEventListener("click", onDelegatedClick);
      handle.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      handle.removeEventListener("click", onTriggerClick);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div id="cf-bubble">
      <div id="cf-panel">
        <div className="cfh">
          <div className="cfh-av">
            <img
              loading="lazy"
              decoding="async"
              src="/images/priya-advisor.webp"
              alt="Priya — NIFS Advisor"
              width={44}
              height={44}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <div className="cfh-info">
            <div className="cfh-name">Priya — NIFS Advisor</div>
            <div className="cfh-status">🟢 Online — Ask Priya</div>
          </div>
          <button className="cfh-x" id="cf-x" aria-label="Close">✕</button>
        </div>
        <div className="cf-dots" id="cf-dots">
          <div className="cf-dot on" id="d0" />
          <div className="cf-dot" id="d1" />
          <div className="cf-dot" id="d2" />
          <div className="cf-dot" id="d3" />
        </div>
        <div className="cf-bar-wrap" id="cf-barwrap"><div className="cf-bar-fill" id="cf-bar" /></div>
        <div className="cf-bar-label" id="cf-bar-label" />
        <div className="cf-bd" id="cf-bd" />
      </div>

      <button id="cf-trigger" aria-label="Find your course or job — chat with Priya, online now">
        <span id="cf-trig-avatar">
          <img src="/images/priya-advisor.webp" alt="" loading="lazy" decoding="async" />
          <span id="cf-trig-dot" />
        </span>
        <span className="cf-trig-label">Find My Course / Job</span>
        <span id="cf-teaser">
          Hey! I&apos;m here to help you 👋
          <span id="cf-teaser-x" role="button" tabIndex={0} aria-label="Dismiss">✕</span>
        </span>
      </button>

      <style jsx>{`
        #cf-bubble { position: fixed; bottom: 28px; left: 18px; z-index: 99999; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
        @media (max-width: 767px) { #cf-bubble { bottom: 68px; left: 10px; } }
        #cf-trigger { position: relative; display: flex; align-items: center; background: transparent; border: none; padding: 0; cursor: grab; animation: cf-bob 2.6s ease-in-out infinite; touch-action: none; }
        #cf-trigger:hover { animation-play-state: paused; }
        #cf-bubble.cf-dragging { transition: none; }
        #cf-bubble.cf-dragging #cf-trigger { cursor: grabbing; animation-play-state: paused; }
        #cf-bubble.cf-dragging .cf-trig-label, #cf-bubble.cf-dragging #cf-teaser { display: none; }
        #cf-trig-avatar { position: relative; width: 80px; height: 80px; border-radius: 50%; flex-shrink: 0; background: #dc1711; border: 4px solid #fff; box-shadow: 0 10px 32px rgba(220, 23, 17, 0.4); }
        #cf-trig-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
        #cf-trig-dot { position: absolute; bottom: 2px; right: 2px; width: 18px; height: 18px; border-radius: 50%; background: #22c55e; border: 3px solid #fff; animation: cf-pulse-dot 2s infinite; }
        @keyframes cf-pulse-dot { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
        @keyframes cf-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .cf-trig-label { margin-left: 12px; background: #111; color: #fff; font-size: 13px; font-weight: 700; padding: 9px 14px; border-radius: 10px; white-space: nowrap; opacity: 0; transform: translateX(-6px); transition: opacity 0.18s, transform 0.18s; pointer-events: none; }
        #cf-trigger:hover .cf-trig-label { opacity: 1; transform: translateX(0); }
        @media (max-width: 767px) { .cf-trig-label { display: none; } #cf-trig-avatar { width: 96px; height: 96px; } #cf-trig-dot { width: 20px; height: 20px; } }
        @media (prefers-reduced-motion: reduce) { #cf-trigger { animation: none; } #cf-trig-dot { animation: none; } #cf-teaser.show { animation: none; } }
        #cf-teaser { position: absolute; left: 100%; top: 50%; transform: translateY(-50%) scale(0.85); margin-left: 14px; background: #fff; color: #111; font-size: 13px; font-weight: 700; padding: 11px 32px 11px 15px; border-radius: 16px; white-space: nowrap; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2); opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s; cursor: pointer; z-index: 2; }
        #cf-teaser.show { opacity: 1; pointer-events: auto; transform: translateY(-50%) scale(1); animation: cf-teaser-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
        #cf-teaser::before { content: ""; position: absolute; left: -6px; top: 50%; transform: translateY(-50%); border: 7px solid transparent; border-right-color: #fff; }
        #cf-teaser-x { position: absolute; top: 5px; right: 7px; background: none; border: none; color: #aaa; font-size: 12px; line-height: 1; cursor: pointer; padding: 2px; }
        #cf-teaser-x:hover { color: #dc1711; }
        @keyframes cf-teaser-pop { 0% { opacity: 0; transform: translateY(-50%) scale(0.6); } 60% { opacity: 1; transform: translateY(-50%) scale(1.08); } 100% { opacity: 1; transform: translateY(-50%) scale(1); } }
        @media (max-width: 480px) { #cf-teaser { font-size: 12px; padding: 10px 28px 10px 13px; } }
        #cf-panel { display: none; background: #fff; border-radius: 20px; box-shadow: 0 12px 48px rgba(0, 0, 0, 0.22); width: 340px; max-width: calc(100vw - 28px); max-height: 88vh; overflow-y: auto; transform-origin: bottom left; opacity: 1; }
        #cf-panel.cf-show { display: block; opacity: 1; animation: cf-pop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        #cf-panel.cf-hide { animation: cf-popout 0.16s ease-in forwards; }
        @keyframes cf-pop { from { opacity: 1; transform: scale(0.75) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes cf-popout { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.75) translateY(12px); } }
        .cfh { background: linear-gradient(135deg, #dc1711, #a80e0b); padding: 14px 16px; display: flex; align-items: center; gap: 11px; }
        .cfh-av { width: 44px; height: 44px; border-radius: 50%; background: #fbbf24; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255, 255, 255, 0.4); overflow: hidden; }
        .cfh-name { color: #fff; font-size: 13px; font-weight: 800; line-height: 1.2; }
        .cfh-status { color: rgba(255, 255, 255, 0.8); font-size: 11px; font-weight: 500; }
        .cfh-info { flex: 1; }
        .cfh-x { background: rgba(255, 255, 255, 0.2); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 16px; line-height: 28px; flex-shrink: 0; }
        .cfh-x:hover { background: rgba(255, 255, 255, 0.35); }
        :global(.cf-dots) { display: flex; gap: 4px; padding: 12px 16px 0; }
        :global(.cf-dot) { width: 8px; height: 8px; border-radius: 50%; background: #e5e7eb; transition: all 0.3s; }
        :global(.cf-dot.on) { background: #dc1711; width: 20px; border-radius: 4px; }
        :global(.cf-dot.ok) { background: #22c55e; }
        :global(.cf-bd) { padding: 14px 16px 16px; }
        :global(.cf-q) { font-size: 15px; font-weight: 800; color: #111; margin-bottom: 12px; line-height: 1.35; }
        :global(.cf-q em) { color: #dc1711; font-style: normal; }
        :global(.cf-opts) { display: flex; flex-direction: column; gap: 7px; }
        :global(.cf-o) { display: flex; align-items: center; gap: 10px; padding: 10px 13px; border-radius: 12px; border: 1.8px solid #e5e7eb; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; color: #222; transition: border-color 0.15s, background 0.15s, color 0.15s; text-align: left; width: 100%; }
        :global(.cf-o:hover) { border-color: #dc1711; background: #fff5f5; color: #dc1711; }
        :global(.cf-oi) { font-size: 18px; width: 24px; text-align: center; flex-shrink: 0; }
        :global(.cf-sel) { width: 100%; padding: 10px 12px; border: 1.8px solid #e5e7eb; border-radius: 12px; font-size: 13px; font-weight: 600; color: #222; background: #fff; outline: none; }
        :global(.cf-sel:focus) { border-color: #dc1711; }
        :global(input.cf-sel) { margin-bottom: 8px; }
        :global(.cf-nxt) { width: 100%; margin-top: 12px; padding: 11px; background: #dc1711; color: #fff; border: none; border-radius: 12px; font-size: 14px; font-weight: 800; cursor: pointer; }
        :global(.cf-nxt:disabled) { background: #e5e7eb; color: #aaa; cursor: not-allowed; }
        :global(.cf-bk) { background: none; border: none; color: #888; font-size: 12px; font-weight: 600; cursor: pointer; padding: 6px 0; display: block; }
        :global(.cf-bk:hover) { color: #dc1711; }
        :global(.cf-card) { border: 1.8px solid #e5e7eb; border-radius: 14px; padding: 13px; margin-bottom: 9px; }
        :global(.cf-card:hover) { border-color: #dc1711; }
        :global(.cf-badge) { display: inline-block; background: #fff0f0; color: #dc1711; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border-radius: 99px; margin-bottom: 7px; }
        :global(.cf-cn) { font-size: 14px; font-weight: 800; color: #111; margin-bottom: 4px; }
        :global(.cf-cm) { font-size: 11px; color: #666; margin-bottom: 9px; line-height: 1.5; }
        :global(.cf-cd) { font-size: 12px; color: #444; margin-bottom: 10px; line-height: 1.5; }
        :global(.cf-cbs) { display: flex; gap: 7px; }
        :global(.cf-cbs a) { flex: 1; text-align: center; padding: 8px 4px; border-radius: 9px; font-size: 12px; font-weight: 700; text-decoration: none; }
        :global(.cf-wa) { background: #25d366; color: #fff; }
        :global(.cf-ap) { background: #dc1711; color: #fff; }
        :global(.cf-rst) { display: block; width: 100%; text-align: center; padding: 10px; border: 1.8px solid #dc1711; background: #fff; color: #dc1711; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 10px; }
        :global(.cf-rst:hover) { background: #dc1711; color: #fff; }
        :global(.cf-bar-wrap) { height: 5px; background: #e5e7eb; border-radius: 3px; margin: 12px 16px 0; overflow: hidden; display: none; }
        :global(.cf-bar-fill) { height: 100%; background: #dc1711; width: 0; transition: width 0.3s ease; }
        :global(.cf-bar-label) { font-size: 10px; color: #999; padding: 5px 16px 0; display: none; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; }
        :global(.cf-file-label) { display: block; padding: 10px 13px; border: 1.8px dashed #dc1711; border-radius: 12px; background: #fff5f5; color: #dc1711; font-size: 12px; font-weight: 700; text-align: center; cursor: pointer; margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        :global(.cf-hint) { font-size: 10px; color: #999; line-height: 1.5; margin: 0 0 10px; }
        :global(.cf-err) { color: #dc1711; font-size: 11px; font-weight: 700; margin: -4px 0 8px; }
      `}</style>
    </div>
  );
}
