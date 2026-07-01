<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <img src="../assets/img/logo.png" alt="Logo AppClima" class="footer-logo" />
        <span class="footer-title">AppClima</span>
      </div>
      <div class="footer-links">
        <a
          href="https://github.com/astorgaAriel/app-clima-vue"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-ext-link"
          title="Repositorio en GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          href="https://clima-vue-ariel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-ext-link"
          title="Ver app en Vercel"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 22.525H0l12-21.05 12 21.05z"/>
          </svg>
          Vercel
        </a>
      </div>

      <div class="footer-author">
        <span>Desarrollado por</span>
        <a
          href="https://github.com/astorgaAriel"
          target="_blank"
          rel="noopener noreferrer"
          class="author-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Ariel Astorga
        </a>
        <span class="footer-year">{{ year }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%);
  border-top: 2px solid rgba(76, 175, 80, 0.3);
  padding: 28px 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.footer-title {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1rem;
}

.footer-nav {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.footer-link {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.88rem;
  padding: 6px 12px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.footer-link:hover {
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.footer-links {
  display: flex;
  gap: 12px;
}

.footer-ext-link {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 7px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  transition: all 0.2s;
}

.footer-ext-link:hover {
  color: #fff;
  border-color: rgba(76, 175, 80, 0.5);
  background: rgba(76, 175, 80, 0.1);
}

.footer-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
}

.author-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.author-link:hover {
  opacity: 0.8;
}

.footer-year {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }

  .footer-nav {
    justify-content: center;
  }
}
</style>
