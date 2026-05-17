document.addEventListener('DOMContentLoaded', () => {

    // 1. CONTROL DE INTERRUPTOR MODO CLARO / OSCURO (GLOBAL)
    const themeToggle = document.getElementById('theme-toggle');
    
    // Al cargar la página, verificar si el usuario ya tenía una preferencia guardada
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme); // Guardar preferencia
        });
    }

    // 2. FORMULARIO DINÁMICO (FÍSICA / MORAL)
    const btnFisica = document.getElementById('btn-fisica');
    const btnMoral = document.getElementById('btn-moral');
    const fieldsFisica = document.getElementById('fields-fisica');
    const fieldsMoral = document.getElementById('fields-moral');
    const accountTypeInput = document.getElementById('account-type');

    const changeProfileForm = (profileType) => {
        if (!btnFisica || !btnMoral) return;

        if (profileType === 'fisica') {
            btnFisica.classList.add('active');
            btnMoral.classList.remove('active');
            fieldsFisica.style.display = 'block';
            fieldsMoral.style.display = 'none';
            if(accountTypeInput) accountTypeInput.value = 'fisica';
            
            document.getElementById('full-name').required = true;
            document.getElementById('company-name').required = false;
            document.getElementById('rfc-moral').required = false;
        } else {
            btnMoral.classList.add('active');
            btnFisica.classList.remove('active');
            fieldsFisica.style.display = 'none';
            fieldsMoral.style.display = 'block';
            if(accountTypeInput) accountTypeInput.value = 'moral';
            
            document.getElementById('full-name').required = false;
            document.getElementById('company-name').required = true;
            document.getElementById('rfc-moral').required = true;
        }
    };

    if (btnFisica && btnMoral) {
        btnFisica.addEventListener('click', () => changeProfileForm('fisica'));
        btnMoral.addEventListener('click', () => changeProfileForm('moral'));
    }

    // Leer parámetros de redirección URL
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam) {
        changeProfileForm(typeParam);
    } else {
        changeProfileForm('fisica');
    }

    // 3. MENÚ RESPONSIVO MOBILE
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            menuToggle.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }

    // 4. CONTADORES DINÁMICOS EN SCROLL
    const numbersToAnimate = document.querySelectorAll('.stat-number');
    
    const animateNumbersOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetLimit = +entry.target.getAttribute('data-target');
                const runCounter = () => {
                    const currentVal = +entry.target.innerText;
                    const increment = targetLimit / 40;
                    
                    if (currentVal < targetLimit) {
                        entry.target.innerText = Math.ceil(currentVal + increment);
                        setTimeout(runCounter, 30);
                    } else {
                        if (targetLimit === 99) entry.target.innerText = '99%';
                        else if (targetLimit === 500) entry.target.innerText = '500K';
                        else entry.target.innerText = '24/7';
                    }
                };
                runCounter();
                observer.unobserve(entry.target);
            }
        });
    };

    if (numbersToAnimate.length > 0) {
        const intersectionObserver = new IntersectionObserver(animateNumbersOnScroll, { threshold: 0.2 });
        numbersToAnimate.forEach(num => intersectionObserver.observe(num));
    }

    // 5. ENVÍOS DE FORMULARIOS
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('user-email').value;
            alert(`¡Solicitud procesada con éxito! Enviamos los detalles de validación al correo: ${email}`);
            joinForm.reset();
            changeProfileForm('fisica');
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('login-user').value;
            alert(`Estableciendo conexión... Bienvenid@ ${user}.`);
            loginForm.reset();
        });
    }
});