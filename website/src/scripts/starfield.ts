/**
 * StarField canvas animation
 * Creates a subtle starfield effect with twinkling stars
 */

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export class Stars {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId: number = 0;
  private isDestroyed: boolean = false;
  private maxRadius: number;
  private minRadius: number;
  private density: "low" | "medium" | "high";

  constructor(
    canvasId: string,
    maxRadius: number = 3,
    minRadius: number = 1,
    density: "low" | "medium" | "high" = "low"
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }

    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = ctx;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    this.density = density;

    this.resize();
    this.createStars();
    this.animate();

    // Handle resize
    window.addEventListener("resize", this.handleResize);

    // Fade in canvas
    requestAnimationFrame(() => {
      this.canvas.classList.add("opacity-100");
      this.canvas.classList.remove("opacity-0");
    });
  }

  private handleResize = () => {
    this.resize();
    this.createStars();
  };

  private resize() {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.offsetWidth;
      this.canvas.height = parent.offsetHeight;
    }
  }

  private getStarCount(): number {
    const area = this.canvas.width * this.canvas.height;
    const densityMultiplier = {
      low: 0.00003,
      medium: 0.00006,
      high: 0.0001,
    };
    return Math.floor(area * densityMultiplier[this.density]);
  }

  private createStars() {
    this.stars = [];
    const count = this.getStarCount();

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius:
          Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  private animate = () => {
    if (this.isDestroyed) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const time = Date.now() * 0.001;

    this.stars.forEach((star) => {
      const twinkle =
        Math.sin(time * star.twinkleSpeed * 10 + star.twinklePhase) * 0.3 + 0.7;
      const opacity = star.opacity * twinkle;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.handleResize);
  }
}
