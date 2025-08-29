document.addEventListener('DOMContentLoaded', () => {
    // 요소 가져오기
    const petalsContainer = document.querySelector('.petals-container');
    const firstPage = document.querySelector('.first-page');
    const invitationContainer = document.querySelector('.invitation-container');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const numberOfPetals = 50;

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
        console.log("꽃ㅇ닢 호툴")
        setInterval(createPetal, 300);
    }
    
    // --- 첫 페이지 스크롤 기능 ---
    let isInvitationVisible = false;
    window.addEventListener('scroll', () => {
        if (!isInvitationVisible && window.scrollY > window.innerHeight / 2) {
            // 첫 페이지를 서서히 사라지게 함
            firstPage.style.opacity = '0';
            setTimeout(() => {
                firstPage.style.display = 'none';
            }, 1000);

            // 청첩장 컨테이너를 서서히 나타나게 함
            invitationContainer.style.opacity = '1';
            invitationContainer.style.visibility = 'visible';
            
            isInvitationVisible = true;
        }
    });

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

    // 페이지 로드 시 모든 애니메이션 시작
    startFallingPetals();
});