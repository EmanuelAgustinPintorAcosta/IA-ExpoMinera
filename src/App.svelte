<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import Footer from "./components/Footer.svelte";
  import { tutorialCatalog } from "./lib/data/tutorialCatalog";
  let isBrightMode = false;
  let isNotebookModalOpen = false;
  let notebookStep = 0;

  type TutorialKey = keyof typeof tutorialCatalog;

  type ToolCategory =
    | "todas"
    | "contenido"
    | "planificacion"
    | "evaluacion"
    | "creatividad";

  type Tool = {
    name: string;
    badge: string;
    category: ToolCategory;
    icon: string;
    description: string;
    tags: string[];
    difficulty: 1 | 2 | 3;
    url: string;
    hasDemo: boolean;
    demoKey?: TutorialKey;
  };

  const tools: Tool[] = [
    {
      name: "NotebookLM",
      badge: "Destacada",
      category: "contenido",
      icon: "/notebooklm.png",
      description:
        "Transforma documentos en resúmenes, audios y guías de estudio con IA.",
      tags: ["resúmenes", "podcast", "documentos"],
      difficulty: 1,
      url: "https://notebooklm.google.com",
      hasDemo: true,
      demoKey: "notebooklm",
    },
    {
      name: "ChatGPT",
      badge: "Popular",
      category: "planificacion",
      icon: "/gpt.png",
      description:
        "Crea secuencias didácticas, consignas, rúbricas y actividades en minutos.",
      tags: ["clases", "ideas", "rúbricas"],
      difficulty: 1,
      url: "https://chatgpt.com",
      hasDemo: true,
      demoKey: "chatgpt",
    },
    {
      name: "Canva IA",
      badge: "Visual",
      category: "creatividad",
      icon: "/Canva.png",
      description:
        "Diseña láminas, presentaciones y recursos visuales listos para el aula.",
      tags: ["diseño", "presentaciones", "infografías"],
      difficulty: 1,
      url: "https://www.canva.com",
      hasDemo: true,
      demoKey: "canva",
    },
    {
      name: "Perplexity",
      badge: "Investigación",
      category: "contenido",
      icon: "/perplexity.png",
      description:
        "Investiga temas con fuentes citadas para construir clases con evidencia.",
      tags: ["fuentes", "investigación", "citas"],
      difficulty: 2,
      url: "https://www.perplexity.ai",
      hasDemo: true,
      demoKey: "perplexity",
    },
    {
      name: "Wayground",
      badge: "Evaluación",
      category: "evaluacion",
      icon: "/wayground.png",
      description:
        "Genera evaluaciones gamificadas y seguimiento del progreso del grupo.",
      tags: ["quizzes", "reportes", "gamificación"],
      difficulty: 1,
      url: "https://wayground.com",
      hasDemo: true,
      demoKey: "wayground",
    },
    {
      name: "MagicSchool",
      badge: "Docencia",
      category: "planificacion",
      icon: "/magicschool.jpeg",
      description:
        "Asistente para planificar clases, adaptar consignas y ahorrar tiempo docente.",
      tags: ["planificación", "adaptaciones", "plantillas"],
      difficulty: 2,
      url: "https://www.magicschool.ai",
      hasDemo: true,
      demoKey: "magic",
    },
  ];

  const stats = [
    {
      value: 50,
      prefix: "+",
      suffix: "",
      label: "herramientas para explorar (base escalable)",
    },
    {
      value: 10,
      prefix: "",
      suffix: " min",
      label: "tutoriales cortos y accionables",
    },
    {
      value: 100,
      prefix: "",
      suffix: "%",
      label: "enfoque en aplicación real en aula",
    },
  ] as const;

  let activeTutorialKey: TutorialKey = "notebooklm";

  const categories: { id: ToolCategory; label: string }[] = [
    { id: "todas", label: "Todas" },
    { id: "contenido", label: "Contenido" },
    { id: "planificacion", label: "Planificación" },
    { id: "evaluacion", label: "Evaluación" },
    { id: "creatividad", label: "Creatividad" },
  ];

  const tutorials = [
    {
      step: "01",
      title: "Elegí una herramienta",
      text: "Explorá por objetivo: explicar, crear material, evaluar o investigar.",
    },
    {
      step: "02",
      title: "Seguí el tutorial guiado",
      text: "Recorridos breves de 5 a 10 minutos con ejemplos reales de aula.",
    },
    {
      step: "03",
      title: "Aplicá en clase",
      text: "Llevate una actividad lista para usar o adaptar a tu contexto.",
    },
  ];

  let activeCategory: ToolCategory = "todas";

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = 92;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const openNotebookDemo = (tutorialKey: TutorialKey = "notebooklm") => {
    notebookStep = 0;
    activeTutorialKey = tutorialKey;
    isNotebookModalOpen = true;
    document.body.style.overflow = "hidden";
  };

  const closeNotebookDemo = () => {
    isNotebookModalOpen = false;
    document.body.style.overflow = "";
  };

  const nextNotebookStep = () => {
    if (notebookStep < currentTutorialSteps.length - 1) notebookStep += 1;
  };

  const prevNotebookStep = () => {
    if (notebookStep > 0) notebookStep -= 1;
  };

  const revealOnScroll = (node: HTMLElement) => {
    const transitionDelay = node.dataset.revealDelay ?? "0ms";
    node.style.setProperty("--reveal-delay", transitionDelay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number.parseInt(
              node.dataset.revealStartDelay ?? "120",
              10,
            );
            window.setTimeout(
              () => {
                node.style.setProperty("--reveal", "1");
              },
              Number.isNaN(delay) ? 120 : delay,
            );
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  };

  const tilt3d = (node: HTMLElement) => {
    const maxTilt = 9;

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * maxTilt * 2;
      const rotX = (0.5 - py) * maxTilt * 2;

      node.style.setProperty("--rotateX", `${rotX.toFixed(2)}deg`);
      node.style.setProperty("--rotateY", `${rotY.toFixed(2)}deg`);
      node.style.setProperty("--glowX", `${(px * 100).toFixed(2)}%`);
      node.style.setProperty("--glowY", `${(py * 100).toFixed(2)}%`);
    };

    const handleLeave = () => {
      node.style.setProperty("--rotateX", "0deg");
      node.style.setProperty("--rotateY", "0deg");
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);

    return {
      destroy() {
        node.removeEventListener("mousemove", handleMove);
        node.removeEventListener("mouseleave", handleLeave);
      },
    };
  };

  const countUp = (
    node: HTMLElement,
    opts: { end: number; prefix?: string; suffix?: string; duration?: number },
  ) => {
    const { end, prefix = "", suffix = "", duration = 1300 } = opts;
    let raf = 0;

    const startCounter = () => {
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(end * eased);
        node.textContent = `${prefix}${value}${suffix}`;

        if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return {
      destroy() {
        cancelAnimationFrame(raf);
        observer.disconnect();
      },
    };
  };

  const cursorGlow = (node: HTMLElement) => {
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const render = () => {
      node.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
      raf = 0;
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move, { passive: true });

    return {
      destroy() {
        window.removeEventListener("mousemove", move);
        if (raf) cancelAnimationFrame(raf);
      },
    };
  };

  $: filteredTools =
    activeCategory === "todas"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);
  $: notebookProgress =
    ((notebookStep + 1) / currentTutorialSteps.length) * 100;
  $: currentTutorial = tutorialCatalog[activeTutorialKey];
  $: currentTutorialSteps = currentTutorial.steps;
</script>

<div
  class="landing min-h-screen bg-slate-950 text-white"
  class:bright-mode={isBrightMode}
>
  <div class="cursor-glow" use:cursorGlow></div>

  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="grid-mask"></div>
  </div>

  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
  >
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4"
    >
      <div class="flex items-center gap-2 md:gap-3 overflow-hidden">
        <span
          class="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg shrink-0"
          ><img
            src="/LOGO-IAenlamochila.png"
            alt="logo"
            class="h-full w-full object-contain"
          /></span
        >
        <div class="shrink min-w-0 pr-2">
          <p class="text-xs md:text-sm text-white/70 truncate">
            ExpoMinera 2026 · San Juan
          </p>
          <p class="text-sm md:text-base font-semibold tracking-wide truncate">
            IA en la Mochila
          </p>
        </div>
      </div>

      <div class="hidden items-center gap-6 lg:flex shrink-0">
        <button
          on:click={() => scrollToSection("impacto")}
          class="text-sm text-white/80 hover:text-white">Impacto</button
        >
        <button
          on:click={() => scrollToSection("tutoriales")}
          class="text-sm text-white/80 hover:text-white">Tutoriales</button
        >
        <button
          on:click={() => scrollToSection("herramientas")}
          class="text-sm text-white/80 hover:text-white">Herramientas</button
        >
      </div>

      <div class="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          on:click={() => scrollToSection("herramientas")}
          class="rounded-full bg-white px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-slate-900 hover:scale-105 whitespace-nowrap transition-all"
        >
          Empezar ahora
        </button>
        <button
          class="rounded-full border border-white/20 bg-white/5 px-2 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-white/90 hover:bg-white/10 whitespace-nowrap transition-all flex items-center justify-center gap-1"
          on:click={() => {
            isBrightMode = !isBrightMode;
          }}
        >
          <span>{isBrightMode ? "🌞" : "✨"}</span>
          <span class="hidden sm:inline"
            >{isBrightMode ? "Noche" : "Brillante"}</span
          >
        </button>
      </div>
    </nav>
  </header>

  <main class="relative z-10">
    <section
      class="scroll-reveal mx-auto max-w-7xl px-6 pb-16 pt-8 md:pb-24 md:pt-12"
      use:revealOnScroll
      data-reveal-start-delay="80"
    >
      <div class="w-full flex flex-col items-start text-left">
        <span
          class="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/80"
        >
          <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
          Plataforma educativa de IA para toda la comunidad
        </span>

        <h1 class="w-full font-black tracking-tighter">
          <span
            class="text-yellow-400 block leading-[1.05] text-[11vw] sm:text-[9vw] md:text-[8vw]"
          >
            Descubrí y usá IA en Educación
          </span>
          <span
            class="text-white block mt-4 md:mt-6 leading-[1.05] text-[7vw] sm:text-[6vw] md:text-[5vw]"
          >
            de forma simple y poderosa
          </span>
        </h1>

        <p class="mt-8 max-w-4xl text-xl text-white/75 md:text-2xl">
          Una landing pensada para impactar: catálogo visual de herramientas,
          tutoriales guiados y casos de uso reales para transformar clases y
          aprendizaje.
        </p>

        <div
          class="mt-10 flex flex-col sm:flex-row w-full items-center justify-center gap-4 sm:gap-8 md:gap-16"
        >
          <button
            on:click={() => scrollToSection("herramientas")}
            class="w-full sm:w-auto rounded-xl bg-white px-6 md:px-8 py-3 md:py-4 text-base md:text-xl font-bold text-slate-900 hover:scale-[1.03] transition-all whitespace-nowrap"
          >
            Ver herramientas
          </button>
          <button
            on:click={() => scrollToSection("tutoriales")}
            class="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-6 md:px-8 py-3 md:py-4 text-base md:text-xl font-bold text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Ver tutoriales
          </button>
        </div>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        {#each stats as stat, i}
          <article
            class="scroll-reveal glass-card tilt-card p-5"
            use:tilt3d
            use:revealOnScroll
            data-reveal-delay={`${i * 120}ms`}
          >
            <p
              class="text-3xl font-black"
              use:countUp={{
                end: stat.value,
                prefix: stat.prefix,
                suffix: stat.suffix,
              }}
            >
              {stat.prefix}0{stat.suffix}
            </p>
            <p class="mt-1 text-sm text-white/70">{stat.label}</p>
          </article>
        {/each}
      </div>
    </section>

    <section
      id="impacto"
      class="scroll-reveal section-anchor mx-auto max-w-7xl px-6 pb-24"
      use:revealOnScroll
    >
      <div
        class="rounded-3xl border border-white/15 bg-linear-to-r from-rose-500/20 via-orange-400/20 to-amber-300/20 p-8 md:p-12"
        use:tilt3d
      >
        <h2 class="text-3xl font-black text-white md:text-5xl">
          Una experiencia que sí se siente ExpoMinera 2026
        </h2>
        <p class="mt-4 max-w-3xl text-lg text-white/80">
          Diseño inmersivo, navegación clara y foco educativo. Esta landing
          queda lista para crecer con más IA, más tutoriales y métricas de
          adopción en tiempo real.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            on:click={() => scrollToSection("herramientas")}
            class="w-full sm:w-auto rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:scale-[1.03] transition-all"
          >
            Explorar ahora
          </button>
          <button
            on:click={() => openNotebookDemo()}
            class="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15 transition-all"
          >
            Abrir demo de tutorial NotebookLM
          </button>
        </div>
      </div>
    </section>

    <section
      id="tutoriales"
      class="scroll-reveal section-anchor mx-auto max-w-7xl px-6 pb-24 md:pb-32"
      use:revealOnScroll
    >
      <div class="glass-card tilt-card p-8 md:p-12" use:tilt3d>
        <p class="text-sm uppercase tracking-[0.2em] text-white/50">
          Aprendizaje guiado
        </p>
        <h2 class="mt-3 text-3xl font-extrabold text-white md:text-4xl">
          Tutoriales dentro de la app
        </h2>
        <p class="mt-3 max-w-2xl text-white/70">
          Inspirado en plataformas de aprendizaje modernas: pasos cortos,
          visuales y orientados a resultados para que cualquiera pueda empezar
          sin fricción.
        </p>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          {#each tutorials as item, i}
            <article
              class="scroll-reveal rounded-2xl border border-white/15 bg-white/5 p-5"
              use:revealOnScroll
              data-reveal-delay={`${i * 140}ms`}
            >
              <p class="text-xs tracking-[0.2em] text-amber-300">
                PASO {item.step}
              </p>
              <h3 class="mt-2 text-xl font-bold text-white">{item.title}</h3>
              <p class="mt-2 text-sm text-white/70">{item.text}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section
      id="herramientas"
      class="scroll-reveal section-anchor mx-auto max-w-7xl px-6 pb-20"
      use:revealOnScroll
    >
      <div class="glass-card p-6 md:p-8 mb-8">
        <div class="mb-6">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">
            Elegidas para el aula
          </p>
          <h2 class="mt-2 text-3xl font-extrabold text-white md:text-4xl">
            Herramientas destacadas
          </h2>
        </div>

        <div class="flex flex-wrap gap-2 md:gap-3">
          {#each categories as category}
            <button
              on:click={() => {
                activeCategory = category.id;
              }}
              class="rounded-full border px-4 py-2 text-xs md:text-sm font-medium transition {activeCategory ===
              category.id
                ? 'border-white bg-white text-slate-900'
                : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'}"
            >
              {category.label}
            </button>
          {/each}
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {#each filteredTools as tool, idx}
          <article
            class="scroll-reveal glass-card tilt-card group p-5"
            use:tilt3d
            use:revealOnScroll
            data-reveal-delay={`${idx * 80}ms`}
          >
            <div class="flex items-start justify-between">
              {#if tool.icon.startsWith("/")}
                <img
                  src={tool.icon}
                  alt={`Logo de ${tool.name}`}
                  class="h-10 w-10 object-contain rounded-md bg-white/10 p-1"
                />
              {:else}
                <span class="text-4xl">{tool.icon}</span>
              {/if}

              <span
                class="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80"
                >{tool.badge}</span
              >
            </div>

            <h3 class="mt-4 text-2xl font-bold text-white">{tool.name}</h3>
            <p class="mt-2 text-sm text-white/75">{tool.description}</p>

            <div class="mt-4 flex flex-wrap gap-2">
              {#each tool.tags as tag}
                <span
                  class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                  >{tag}</span
                >
              {/each}
            </div>

            <div class="mt-6 flex items-center justify-between gap-2">
              <span
                class="flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-amber-300"
                aria-label={`Dificultad ${tool.difficulty} de 3`}
              >
                Dificultad
                <span class="ml-1 text-base tracking-normal">
                  {#each Array(3) as _, i}
                    <span>{i < tool.difficulty ? "★" : "☆"}</span>
                  {/each}
                </span>
              </span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:border-white hover:bg-white/10"
              >
                Ir al sitio
              </a>
            </div>

            <button
              on:click={tool.hasDemo
                ? () => openNotebookDemo(tool.demoKey)
                : null}
              class="mt-3 w-full rounded-lg border px-4 py-2 text-sm font-semibold transition-all {tool.hasDemo
                ? 'border-cyan-300/40 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20'
                : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed opacity-50'}"
            >
              {tool.hasDemo
                ? "Ver Tutorial interactivo"
                : "Tutorial interactivo (próximamente)"}
            </button>
          </article>
        {/each}
      </div>
    </section>
  </main>

  {#if isNotebookModalOpen}
    <div
      class="fixed inset-0 z-100 bg-black/90 p-0 md:p-10 flex items-center justify-center backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      transition:fade={{ duration: 250 }}
    >
      <div
        class="w-full h-full max-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden shadow-2xl md:rounded-3xl border-0 md:border md:border-white/10"
        style="height: 100%; max-height: 100dvh;"
        transition:scale={{ duration: 400, start: 0.95, opacity: 0 }}
      >
        <!-- Left Sidebar: Instructions -->
        <div
          class="flex flex-col min-h-0 flex-1 md:flex-none md:h-full w-full md:w-100 lg:w-112.5 bg-slate-900 border-b md:border-b-0 md:border-r border-white/10"
        >
          <!-- Header & Progress -->
          <div
            class="px-6 py-4 md:px-7 md:py-6 border-b border-white/10 flex-none"
          >
            <div class="mb-3 md:mb-5 flex items-center justify-between">
              <div>
                <p
                  class="text-xs uppercase tracking-[0.2em] text-cyan-200 font-bold mb-1"
                >
                  {currentTutorial.label} · Guiado
                </p>
                <h3 class="text-xl md:text-2xl font-bold text-white">
                  ExpoMinera 2026
                </h3>
              </div>
              <button
                on:click={closeNotebookDemo}
                class="lg:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Cerrar tutorial"
              >
                ✕
              </button>
            </div>

            <div class="mb-0">
              <div
                class="flex justify-between text-sm mb-2 font-bold text-gray-400"
              >
                <span>Progreso</span>
                <span
                  >Paso {notebookStep + 1} / {currentTutorialSteps.length}</span
                >
              </div>
              <div
                class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-linear-to-r transition-all duration-500 {currentTutorial.accent}"
                  style={`width: ${notebookProgress}%`}
                ></div>
              </div>
            </div>
          </div>

          <div
            class="flex-1 min-h-0 overflow-y-auto px-6 py-4 md:px-7 md:py-5 custom-scrollbar space-y-4 md:space-y-5"
          >
            <h4 class="text-2xl md:text-3xl font-black leading-tight mb-4">
              <span class="text-cyan-400">Paso {notebookStep + 1}:</span>
              <span class="text-white"
                >{currentTutorialSteps[notebookStep].title}</span
              >
            </h4>

            <p class="text-base md:text-lg leading-snug text-white/80">
              {currentTutorialSteps[notebookStep].description}
            </p>

            <div
              class="bg-cyan-400/10 border border-cyan-400/30 p-4 md:p-5 rounded-2xl mt-6 md:mt-8"
            >
              <p
                class="text-sm md:text-base font-medium leading-snug text-cyan-100 flex gap-2 md:gap-3"
              >
                <span class="text-xl md:text-2xl shrink-0">💡</span>
                {currentTutorialSteps[notebookStep].tip}
              </p>
            </div>

            <!-- Imagen inline para móviles y tablets (debajo del tip) -->
            {#if currentTutorialSteps[notebookStep].image}
              <div
                class="block lg:hidden w-full mt-4 rounded-xl overflow-hidden border border-white/10 bg-slate-800 shadow-inner"
              >
                <img
                  src={currentTutorialSteps[notebookStep].image}
                  alt="Pantalla del paso {notebookStep + 1}"
                  class="w-full h-auto max-h-350px md:max-h-500px object-contain select-none"
                />
              </div>
            {/if}
          </div>

          <!-- Navigation Buttons -->
          <div
            class="p-4 md:p-6 border-t border-white/10 flex-none flex items-center justify-between gap-2 md:gap-4"
          >
            <button
              on:click={prevNotebookStep}
              disabled={notebookStep === 0}
              class="flex-1 py-3 md:py-4 border rounded-xl border-white/20 text-white font-bold text-sm md:text-base hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Anterior
            </button>

            {#if notebookStep < currentTutorialSteps.length - 1}
              <button
                on:click={nextNotebookStep}
                class="flex-1 md:flex-2 py-3 md:py-4 px-4 md:px-6 rounded-xl bg-white text-slate-950 font-black text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all"
              >
                Siguiente →
              </button>
            {:else}
              <button
                on:click={closeNotebookDemo}
                class="flex-1 md:flex-2 py-3 md:py-4 px-4 md:px-6 rounded-xl bg-emerald-400 text-slate-950 font-black text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all"
              >
                Finalizar ✓
              </button>
            {/if}
          </div>
        </div>

        <!-- Right Side: Visual Mockup (Desktop solo) -->
        <div
          class="relative min-h-0 flex-1 bg-black items-center justify-center p-0 overflow-hidden hidden md:flex"
        >
          <button
            on:click={closeNotebookDemo}
            class="absolute top-6 right-6 flex items-center justify-center w-10 h-10 bg-slate-900/80 backdrop-blur hover:bg-slate-800 rounded-full text-white font-bold transition-all z-20 border border-white/10"
            aria-label="Cerrar tutorial"
          >
            ✕
          </button>

          <div class="w-full h-full relative p-2 md:p-4">
            <div
              class="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-white/5"
            >
              {#if currentTutorialSteps[notebookStep].image}
                <img
                  src={currentTutorialSteps[notebookStep].image}
                  alt="Pantalla del paso {notebookStep + 1}"
                  class="w-full h-full object-contain opacity-95 select-none"
                />
              {:else}
                <div
                  class="w-full h-full flex flex-col items-center justify-center text-white/20"
                >
                  <span class="text-[10rem] mb-4">💻</span>
                  <span class="text-2xl font-bold"
                    >Mockup Pantalla {notebookStep + 1}</span
                  >
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <Footer />
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  .landing {
    position: relative;
    isolation: isolate;
    transition: background 320ms ease;
  }

  .bright-mode {
    background: radial-gradient(
        circle at 12% 18%,
        rgba(250, 204, 21, 0.4),
        transparent 44%
      ),
      radial-gradient(
        circle at 86% 12%,
        rgba(251, 146, 60, 0.34),
        transparent 38%
      ),
      radial-gradient(
        circle at 50% 100%,
        rgba(125, 211, 252, 0.2),
        transparent 46%
      ),
      #2f3f5f;
  }

  .glass-card {
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.09),
      rgba(255, 255, 255, 0.04)
    );
    backdrop-filter: blur(14px);
    border-radius: 1.2rem;
    box-shadow: 0 12px 45px rgba(0, 0, 0, 0.25);
    transition:
      transform 280ms ease,
      box-shadow 280ms ease,
      border-color 280ms ease,
      background 280ms ease;
    transform-style: preserve-3d;
  }

  .tilt-card {
    --rotateX: 0deg;
    --rotateY: 0deg;
    --glowX: 50%;
    --glowY: 50%;
    transform: perspective(900px) rotateX(var(--rotateX))
      rotateY(var(--rotateY));
    position: relative;
    overflow: hidden;
  }

  .tilt-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--glowX) var(--glowY),
      rgba(255, 255, 255, 0.14),
      transparent 45%
    );
    pointer-events: none;
  }

  .scroll-reveal {
    --reveal: 0;
    opacity: var(--reveal);
    transform: translateY(calc((1 - var(--reveal)) * 26px))
      scale(calc(0.985 + var(--reveal) * 0.015));
    transition:
      opacity 560ms ease,
      transform 560ms ease;
    will-change: transform, opacity;
  }

  .grid-mask {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.06) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(circle at center, black 10%, transparent 75%);
    opacity: 0.28;
  }

  .blob {
    position: absolute;
    border-radius: 999px;
    filter: blur(70px);
    opacity: 0.5;
    animation: float 13s ease-in-out infinite;
  }

  .blob-1 {
    width: 330px;
    height: 330px;
    background: #fb7185;
    top: 4%;
    left: -70px;
  }

  .blob-2 {
    width: 300px;
    height: 300px;
    background: #f59e0b;
    top: 28%;
    right: -80px;
    animation-delay: 1.3s;
  }

  .blob-3 {
    width: 250px;
    height: 250px;
    background: #22d3ee;
    bottom: 9%;
    left: 30%;
    animation-delay: 2.2s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-18px) scale(1.03);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .blob,
    .scroll-reveal,
    .glass-card,
    .tilt-card {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
