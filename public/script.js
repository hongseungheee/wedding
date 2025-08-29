document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.querySelector('.petals-container');
    const firstPage = document.querySelector('.first-page');
    const invitationContainer = document.querySelector('.invitation-container');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const numberOfPetals = 50;
    let petalInterval;

    // --- 꽃잎 기능 ---
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const startPosition = Math.random() * 100;
        petal.style.left = `${startPosition}vw`;

        const animationDuration = Math.random() * 5 + 5;
        petal.style.animationDuration = `${animationDuration}s`;
        
        //const animationDelay = Math.random() * 2;
        //petal.style.animationDelay = `${animationDelay}s`;
        
        const colors = ['#ffb6c1', '#ffc0cb', '#ffe4e1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.backgroundColor = randomColor;

        petalsContainer.appendChild(petal);
        
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    function startFallingPetals() {
        if (!petalInterval) {
            petalInterval = setInterval(createPetal, 600);
        }
    }

    function stopFallingPetals() {
        clearInterval(petalInterval);
        petalInterval = null;
        petalsContainer.innerHTML = '';
    }

    // --- 스크롤에 따른 페이지 전환 및 꽃잎 제어 기능 ---
    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / window.innerHeight;

        firstPage.style.opacity = 1 - scrollProgress;
        invitationContainer.style.opacity = scrollProgress;

        if (scrollProgress > 0.5) {
            invitationContainer.style.visibility = 'visible';
            stopFallingPetals();
        } else {
            invitationContainer.style.visibility = 'hidden';
            startFallingPetals();
        }
    });

     // --- Swiper 앨범 슬라이드 기능 ---
     const swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        loop: true,
    });


    // --- 앨범 사진 클릭 시 팝업 기능 ---
    const albumPhotos = document.querySelectorAll('.swiper-slide img');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.image-modal .close-btn');

    albumPhotos.forEach(photo => {
        photo.addEventListener('click', () => {
            modalImage.src = photo.src;
            imageModal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });


    // --- 맞춤형 초대 메시지 기능 ---
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const name = getQueryParam('name');
    const invitationMessageElement = document.getElementById('invitation-message');

    if (name) {
        invitationMessageElement.textContent = `${name}님, 저희의 새로운 시작을 함께 축복해주세요.`;
    } else {
        invitationMessageElement.textContent = '';
    }


    // --- 달력 기능 ---
    function generateCalendar(year, month, weddingDay) {
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 해당 월의 첫째 날 요일 (0:일, 1:월, ...)
        const lastDateOfMonth = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜
        const calendarElement = document.createElement('div');
        calendarElement.className = 'calendar';

        // 날짜 헤더
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';
        dateHeader.textContent = `${year}. ${String(month).padStart(2, '0')}`;
        calendarElement.appendChild(dateHeader);

        // 요일
        const dayOfWeek = document.createElement('div');
        dayOfWeek.className = 'day-of-week';
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        days.forEach(day => {
            const span = document.createElement('span');
            span.textContent = day;
            dayOfWeek.appendChild(span);
        });
        calendarElement.appendChild(dayOfWeek);

        // 날짜
        const calendarDays = document.createElement('div');
        calendarDays.className = 'calendar-days';
        // 첫째 날 이전의 빈 칸 추가
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.appendChild(document.createElement('span'));
        }
        // 날짜 추가
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            if (i === weddingDay && year === 2026 && month === 6) {
                span.classList.add('wedding-day');
            }
            calendarDays.appendChild(span);
        }
        calendarElement.appendChild(calendarDays);

        return calendarElement;
    }

    const calendarContainer = document.querySelector('.calendar-container');
    calendarContainer.appendChild(generateCalendar(2026, 6, 6));

    // --- 계좌 복사 기능 ---
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const accountId = event.target.dataset.account;
            const accountText = document.getElementById(accountId);
            const textToCopy = accountText.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = '복사 완료!';
                button.style.backgroundColor = '#5cb85c';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('복사에 실패했습니다. 수동으로 복사해주세요.');
            });
        });
    });


    

    startFallingPetals();
});