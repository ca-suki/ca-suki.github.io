document.addEventListener('DOMContentLoaded', function() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    
    // 点击按钮触发庆祝效果
    celebrateBtn.addEventListener('click', celebrate);
    
    // 页面加载时添加一些小动画
    setTimeout(() => {
        const birthdayText = document.querySelector('.birthday-text');
        birthdayText.style.opacity = '1';
        birthdayText.style.transform = 'translateY(0)';
    }, 500);
    
    // 自动显示气球
    startBalloons();


    // 礼物盒点击事件
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            // 添加打开动画类
            giftBox.classList.add('gift-open');

            // 放烟花效果
            fireConfetti();

            // 播放生日歌曲
            const audio = new Audio('hbty.mp3');

            // 当音频播放结束后跳转
            audio.addEventListener('ended', function() {
                window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7/';
            });

            // 如果音频加载失败，确保仍然跳转
            audio.addEventListener('error', function() {
                console.error('音频加载失败，将直接跳转');
                setTimeout(() => {
                    window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7/';
                }, 800);
            });

            // 开始播放音频
            audio.play().catch(e => {
                console.error('无法自动播放音频:', e);
                // 如果自动播放失败，仍然在短暂延迟后跳转
                setTimeout(() => {
                    window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7/';
                }, 800);
            });
        });
    }
});

// 庆祝效果函数
function celebrate() {
    // 播放庆祝音效
    playAudio();
    
    // 放烟花效果
    fireConfetti();
    
    // 改变按钮文字
    const celebrateBtn = document.getElementById('celebrateBtn');
    celebrateBtn.textContent = "生日快乐！🎉";
    celebrateBtn.disabled = true;
    
    // 2秒后重置按钮
    setTimeout(() => {
        celebrateBtn.textContent = "再次庆祝！";
        celebrateBtn.disabled = false;
    }, 2000);
}

// 播放简单音效
function playAudio() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建简单的生日音效
        const notes = [
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'E4', duration: 1 }
        ];
        
        const frequencies = {
            'C4': 261.63,
            'D4': 293.66,
            'E4': 329.63,
            'F4': 349.23
        };
        
        let time = audioContext.currentTime;
        
        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = frequencies[note.note];
            
            gainNode.gain.setValueAtTime(0.5, time);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + note.duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start(time);
            oscillator.stop(time + note.duration);
            
            time += note.duration;
        });
    } catch(e) {
        console.log("音频播放失败:", e);
    }
}

// 烟花效果
function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        spread: 360,
        ticks: 100,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    };

    confetti({
        ...defaults,
        particleCount: count * 0.25,
        scalar: 0.8,
        shapes: ['circle']
    });

    confetti({
        ...defaults,
        particleCount: count * 0.2,
        scalar: 1.2,
        shapes: ['star']
    });

    confetti({
        ...defaults,
        particleCount: count * 0.35,
        scalar: 0.75,
        shapes: ['square']
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
}

// 气球动画
function startBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach(balloon => {
        balloon.style.display = 'block';
    });
}