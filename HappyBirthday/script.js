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

            // 创建音频对象并播放生日歌
            const audio = new Audio('hbty.mp3');

            // 当音频播放结束后播放视频
            audio.addEventListener('ended', () => {
                playBirthdayVideo();
            });

            // 如果音频加载失败，确保仍然播放视频
            audio.addEventListener('error', () => {
                console.error('音频加载失败，直接播放视频');
                playBirthdayVideo();
            });

            // 开始播放音频
            audio.play().catch(e => {
                console.error('无法自动播放音频:', e);
                // 如果自动播放失败，仍然播放视频
                playBirthdayVideo();
            });
        });
    }

    // 播放视频的函数
    function playBirthdayVideo() {
        setTimeout(() => {
            const videoContainer = document.getElementById('video-container');
            const birthdayVideo = document.getElementById('birthday-video');

            // B站视频链接
            const biliBiliLink = 'https://www.bilibili.com/video/BV1GJ411x7h7/';

            // 显示视频容器
            videoContainer.style.display = 'flex';

            // 添加视频错误事件监听
            birthdayVideo.addEventListener('error', () => {
                console.error('视频加载失败，将跳转到B站');
                window.location.href = biliBiliLink;
            });

            // 播放视频
            birthdayVideo.play().catch(e => {
                console.error('无法自动播放视频:', e);
                // 如果自动播放失败，跳转到B站链接
                setTimeout(() => {
                    window.location.href = biliBiliLink;
                }, 500);
            });

            // 添加关闭按钮事件
            document.getElementById('close-video').addEventListener('click', () => {
                birthdayVideo.pause();
                videoContainer.style.display = 'none';
            });
        }, 300); // 短暂延迟以确保音频已停止
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