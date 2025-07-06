// Sayfa yüklendiğinde yıl güncelle (footer)
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Typewriter efekti başlat
    const typewriter = document.getElementById("typewriter");
    if (typewriter) {
        const text = "MERHABA, BEN BURAK";
        let i = 0;

        function typeWriterEffect() {
            if (i < text.length) {
                typewriter.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriterEffect, 100);
            }
        }

        typeWriterEffect();
    }

    // Eski tema butonunu kaldır (varsa)
    const eskiButon = document.querySelector('button[style*="position: fixed"]');
    if (eskiButon) eskiButon.remove();

    // Switcher ana elemanı
    const switcher = document.createElement("button");
    switcher.className = "theme-switcher";
    switcher.setAttribute('aria-label', 'Tema Değiştir');
    switcher.innerHTML = `
        <span class="switch-track"></span>
        <span class="switch-thumb">🌞</span>
        <span class="switch-icon icon-sun">🌞</span>
        <span class="switch-icon icon-moon">🌙</span>
    `;
    document.body.appendChild(switcher);

    const thumb = switcher.querySelector('.switch-thumb');
    const iconSun = switcher.querySelector('.icon-sun');
    const iconMoon = switcher.querySelector('.icon-moon');

    // Tema durumu localStorage'da saklansın
    function setTheme(dark) {
        if (dark) {
            document.body.classList.add('dark-mode');
            thumb.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-mode');
            thumb.textContent = '🌞';
        }
    }
    if (localStorage.getItem('theme') === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    switcher.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    document.body.appendChild(toast);

    setTimeout(() => { toast.style.opacity = "1"; }, 10);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// GitHub butonlarına uyarı ekle
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a.button").forEach(btn => {
        btn.addEventListener("click", () => {
            showToast("GitHub sayfasına yönlendiriliyorsunuz...");
        });
    });
});
