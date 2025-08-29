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
        
        const animationDelay = Math.random() * 2;
        petal.style.animationDelay = `${animationDelay}s`;
        
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
            petalInterval = setInterval(createPetal, 300);
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
        invitationMessageElement.textContent = '결혼식에 초대합니다';
    }


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