    const slides = [
        {
            text1: "Tôi sợ đánh giá sai, mỗi nơi một kết quả khác nhau.",
            text2: "Con còn nhỏ quá, tôi không biết đâu là thời điểm phù hợp để can thiệp."
        },
        {
            text1: "Tôi không biết liệu con có thể hòa nhập được với các bạn hay không.",
            text2: "Mỗi ngày đến trường của con đều là một cuộc chiến với cảm xúc của cả nhà."
        },
        {
            text1: "Tôi lo lắng rằng không ai thực sự hiểu con mình như tôi hiểu.",
            text2: "Chúng tôi đã thử nhiều nơi nhưng vẫn chưa tìm được đúng hướng đi cho con."
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;

    const sliderContent = document.querySelector('.info-section-slider-content');
    const dots = document.querySelectorAll('.info-section-slider-dot');
    const leftBtn = document.querySelector('.left-slide');
    const rightBtn = document.querySelector('.right-slide');

    dots[0].classList.add('active');

    function updateDots(index) {
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function buildSlideHTML(slide) {
        return `
            <div class="info-section-slider-content-1">
                <img src="./assets/semicolon111.png" alt="semicolon" class="semicolon">
                <p class="info-section-slider-content-text-1">${slide.text1}</p>
            </div>
            <div class="info-section-slider-content-2">
                <img src="./assets/semicolon222.png" alt="semicolon" class="semicolon semicolon-2">
                <p class="info-section-slider-content-text-2">${slide.text2}</p>
            </div>`;
    }

    function goToSlide(newIndex, direction) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const exitClass  = direction === 'right' ? 'slide-exit-left'  : 'slide-exit-right';
    const enterClass = direction === 'right' ? 'slide-enter-right' : 'slide-enter-left';

    // Animate out từng card
    [...sliderContent.children].forEach(child => child.classList.add(exitClass));

    setTimeout(() => {
        sliderContent.innerHTML = buildSlideHTML(slides[newIndex]);
        currentIndex = newIndex;
        updateDots(currentIndex);

        // Animate in từng card mới
        const newChildren = [...sliderContent.children];
        newChildren.forEach(child => child.classList.add(enterClass));

        // Chờ card cuối xong thì unlock
        newChildren[newChildren.length - 1].addEventListener('animationend', () => {
            newChildren.forEach(child => child.classList.remove(enterClass));
            isAnimating = false;
        }, { once: true });

    }, 350);
}
    rightBtn.addEventListener('click', () => goToSlide((currentIndex + 1) % slides.length, 'right'));
    leftBtn.addEventListener('click',  () => goToSlide((currentIndex - 1 + slides.length) % slides.length, 'left'));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (i === currentIndex) return;
            goToSlide(i, i > currentIndex ? 'right' : 'left');
        });
    });


// Slider carousel
let currentSliderIndex = 0;
const sliderImgs = document.querySelectorAll('.slider-img');
const totalSlides = sliderImgs.length;

function updateSliderPosition() {
    sliderImgs.forEach((img, index) => {
        img.className = 'slider-img';
        
        const position = (index - currentSliderIndex + totalSlides) % totalSlides;
        
        if (position === 0) {
            img.classList.add('main');
        } else if (position === 1) {
            img.classList.add('side-next-1');
        } else if (position === 2) {
            img.classList.add('side-next-2');
        } else if (position === totalSlides - 1) {
            img.classList.add('side-prev-1');
        } else if (position === totalSlides - 2) {
            img.classList.add('side-prev-2');
        } else {
            img.classList.add('hidden');
        }
    });
}

document.querySelector('.slider-btn-right').addEventListener('click', () => {
    currentSliderIndex = (currentSliderIndex + 1) % totalSlides;
    updateSliderPosition();
});

document.querySelector('.slider-btn-left').addEventListener('click', () => {
    currentSliderIndex = (currentSliderIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
});

// Initialize slider
updateSliderPosition();

// click xem thêm/thu gọn
document.querySelectorAll('.see-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        
        const currentCard = this.closest('.about-section-card');
        const currentText = currentCard.querySelector('.card-text');
        const currentArrow = currentCard.querySelector('.card-arrow');
        const isCollapsed = currentText.classList.contains('truncated');

        // Toggle chỉ card hiện tại
        if (isCollapsed) {
            // Mở card
            currentText.classList.remove('truncated');
            currentArrow.classList.add('expanded');
            this.textContent = 'thu gọn';
        } else {
            // Đóng card
            currentText.classList.add('truncated');
            currentArrow.classList.remove('expanded');
            this.textContent = 'xem thêm';
        }

        // Cập nhật chiều cao card
        updateCardHeights();
    });
});

// Hàm tính chiều cao tối đa cho card
function updateCardHeights() {
    const cards = document.querySelectorAll('.about-section-card');
    let maxHeight = 0;

    // Reset height để tính toán
    cards.forEach(card => {
        card.style.height = 'auto';
    });

    // Lấy max height
    cards.forEach(card => {
        const height = card.scrollHeight;
        maxHeight = Math.max(maxHeight, height);
    });

    // Set height dựa vào state của card
    cards.forEach(card => {
        const isExpanded = !card.querySelector('.card-text').classList.contains('truncated');
        if (isExpanded) {
            card.style.height = card.scrollHeight + 'px';
        } else {
            card.style.height = 'auto';
        }
    });
}

// Load ban đầu
window.addEventListener('load', () => {
    updateCardHeights();
});

window.addEventListener('resize', () => {
    updateCardHeights();
});

// Click xem thêm cho edu-program-section
document.querySelectorAll('.edu-see-more-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const currentCard = this.closest('.edu-program-card');
        const currentText = currentCard.querySelector('.edu-card-text');
        const currentArrow = currentCard.querySelector('.edu-program-card-arrow');
        const isCollapsed = currentText.classList.contains('truncated');

        if (isCollapsed) {
            currentText.classList.remove('truncated');
            currentArrow.classList.add('expanded');
            this.textContent = 'thu gọn';
        } else {
            currentText.classList.add('truncated');
            currentArrow.classList.remove('expanded');
            this.textContent = 'xem thêm';
        }

        updateEduCardHeights();
    });
});

// Hàm tính chiều cao tối đa cho edu-program-card để các thẻ luôn bằng nhau
function updateEduCardHeights() {
    const cards = document.querySelectorAll('.edu-program-card');
    let maxHeight = 0;

    // Reset height để tính toán chính xác scrollHeight
    cards.forEach(card => {
        card.style.height = 'auto';
    });

    // Tìm chiều cao lớn nhất trong số các card
    cards.forEach(card => {
        maxHeight = Math.max(maxHeight, card.scrollHeight);
    });

    // Áp dụng chiều cao lớn nhất cho tất cả các card
    cards.forEach(card => {
        card.style.height = maxHeight + 'px';
    });
}

// Gọi hàm khi load trang và khi resize trình duyệt
window.addEventListener('load', () => {
    updateEduCardHeights();
});

window.addEventListener('resize', () => {
    updateEduCardHeights();
});