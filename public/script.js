document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.querySelector('.petals-container');
    const numberOfPetals = 50; // 원하는 꽃잎 개수 설정

    // 꽃잎 생성 및 속성 적용
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // 꽃잎이 화면 상단에서 무작위로 시작하도록 설정
        const startPosition = Math.random() * 100;
        petal.style.left = `${startPosition}vw`;

        // 애니메이션 속도를 무작위로 설정하여 자연스러움 추가
        const animationDuration = Math.random() * 5 + 5; // 5초 ~ 10초 사이
        petal.style.animationDuration = `${animationDuration}s`;
        
        // 애니메이션 지연 시간을 무작위로 설정하여 한꺼번에 떨어지지 않게 함
        const animationDelay = Math.random() * 2;
        petal.style.animationDelay = `${animationDelay}s`;
        
        // 꽃잎 색상을 옅은 핑크 계열로 무작위 설정
        const colors = ['#ffb6c1', '#ffc0cb', '#ffe4e1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.backgroundColor = randomColor;

        petalsContainer.appendChild(petal);

        // 꽃잎이 화면 밖으로 나가면 제거하여 메모리 관리
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    // 일정 시간마다 새로운 꽃잎 생성
    function startFallingPetals() {
        setInterval(createPetal, 300); // 0.3초마다 꽃잎 하나씩 생성
    }

    startFallingPetals();
});



// 계좌 복사 기능
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        // data-account 속성 값으로 대상 엘리먼트 ID를 가져옵니다.
        const accountId = event.target.dataset.account;
        const accountText = document.getElementById(accountId);

        // 계좌번호 텍스트를 복사합니다.
        const textToCopy = accountText.textContent.trim();
        
        // Clipboard API를 사용하여 텍스트를 클립보드에 복사합니다.
        navigator.clipboard.writeText(textToCopy).then(() => {
            // 성공 메시지 표시 (예: "복사 완료!")
            const originalText = button.textContent;
            button.textContent = '복사 완료!';
            button.style.backgroundColor = '#5cb85c'; // 성공 시 색상 변경

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ''; // 원래 색상으로 복원
            }, 2000);
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다. 수동으로 복사해주세요.');
        });
    });
});