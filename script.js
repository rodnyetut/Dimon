(function() {
    // Установка даты памяти
    const memorialDate = new Date(2026, 2, 7, 0, 0, 0); // 7 марта 2026 года

    // Функция обновления таймера
    function updateTimer() {
        const now = new Date();
        const diff = now - memorialDate;

        if (diff < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const seconds = Math.floor(diff / 1000);
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
    }

    // Запуск таймера
    updateTimer();
    setInterval(updateTimer, 1000);

    // Управление свечой
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    let isBurning = true;

    if (candle && flame) {
        candle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isBurning) {
                flame.style.display = 'none';
            } else {
                flame.style.display = 'block';
            }
            isBurning = !isBurning;
        });
    }

    // Обработка видео
    const video = document.querySelector('.memorial-video');
    if (video) {
        video.play().catch(function(error) {
            console.log("Автовоспроизведение не удалось:", error);
            // Пытаемся воспроизвести при первом касании
            document.addEventListener('touchstart', function() {
                video.play();
            }, { once: true });
        });
    }

    // Генерация QR-кода
    function generateQRCode() {
        const qrContainer = document.getElementById('qrCode');
        if (!qrContainer) return;

        // Проверяем, загружена ли библиотека QRCode
        if (typeof QRCode === 'undefined') {
            // Если библиотека не загружена, загружаем её
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            script.onload = function() {
                new QRCode(qrContainer, {
                    text: window.location.href,
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            };
            document.head.appendChild(script);
        } else {
            new QRCode(qrContainer, {
                text: window.location.href,
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    // Запускаем генерацию QR-кода
    generateQRCode();

    // Добавляем эффект параллакса для карточки
    const card = document.querySelector('.memorial-card');
    if (card) {
        document.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }

    // Обработка ошибок изображений
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'qr-fallback';
            fallback.textContent = 'QR-код временно недоступен';
            this.parentNode.appendChild(fallback);
        });
    });

    // Предотвращаем выделение текста при двойном клике
    document.addEventListener('mousedown', function(e) {
        if (e.detail > 1) {
            e.preventDefault();
        }
    }, false);

    // Адаптация для мобильных устройств
    function checkMobile() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.style.padding = '10px';
        }
    }
    checkMobile();

    // Добавляем анимацию появления
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'opacity 1s ease, transform 1s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
})();
