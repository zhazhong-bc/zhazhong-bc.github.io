document.addEventListener('DOMContentLoaded', function() {
    // 表单提交验证
    const infoForm = document.getElementById('infoForm');
    if (infoForm) {
        infoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.name.value;
            if (!name) {
                alert('请输入姓名！');
                return;
            }
            alert('提交成功！您的姓名是：' + name);
        });
    }

    // 左侧课程列鼠标悬停效果
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        item.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 背景音乐控制 - 优化版本
    const audio = document.getElementById('bgm');
    const btn = document.getElementById('bgmBtn');
    
    if (audio && btn) {
        // 状态同步函数
        function updateMusicButtonState() {
            btn.textContent = audio.paused ? 
                '播放背景音乐(Bad Apple 25时&钢琴版)' : 
                '暂停背景音乐';
            if (audio.paused) {
                btn.classList.remove('playing');
            } else {
                btn.classList.add('playing');
            }
        }
        
        // 初始状态设置
        updateMusicButtonState();
        
        // 音频播放/暂停事件监听
        audio.addEventListener('play', updateMusicButtonState);
        audio.addEventListener('pause', updateMusicButtonState);
        
        // 音频播放结束事件
        audio.addEventListener('ended', function() {
            console.log('背景音乐播放结束');
            // 可以在这里添加播放结束后的操作，如循环播放等
        });
        
        // 音频加载错误事件
        audio.addEventListener('error', function(e) {
            console.error('音频加载错误:', e);
            btn.textContent = '音频加载失败';
            btn.classList.add('error');
        });
        
        // 按钮点击事件
        btn.addEventListener('click', function() {
            if (audio.paused) {
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // 播放成功
                        console.log('背景音乐开始播放');
                    }).catch(error => {
                        // 播放失败
                        console.error('播放失败:', error);
                        
                        // 更友好的错误提示（可选）
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.innerHTML = `
                            <p>音频播放失败，请检查：</p>
                            <ul>
                                <li>浏览器是否支持自动播放</li>
                                <li>音频文件是否存在</li>
                                <li>是否允许网站播放声音</li>
                            </ul>
                            <p><small>点击关闭</small></p>
                        `;
                        errorMsg.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: rgba(0,0,0,0.9);
                            color: white;
                            padding: 20px;
                            border-radius: 10px;
                            z-index: 1000;
                            max-width: 300px;
                            text-align: left;
                        `;
                        errorMsg.addEventListener('click', function() {
                            document.body.removeChild(this);
                        });
                        document.body.appendChild(errorMsg);
                    });
                }
            } else {
                // 暂停音乐
                audio.pause();
                console.log('背景音乐已暂停');
            }
        });
    }

    // 兼容性检查（可选）
    function checkAudioCompatibility() {
        const audioTest = new Audio();
        const canPlayMP3 = audioTest.canPlayType('audio/mpeg');
        const canPlayWAV = audioTest.canPlayType('audio/wav');
        const canPlayOGG = audioTest.canPlayType('audio/ogg');
        
        console.log('音频格式支持情况:');
        console.log('MP3:', canPlayMP3);
        console.log('WAV:', canPlayWAV);
        console.log('OGG:', canPlayOGG);
        
        // 如果都不支持，给出提示
        if (!canPlayMP3 && !canPlayWAV && !canPlayOGG) {
            console.warn('当前浏览器可能不支持音频播放');
        }
    }
    
    // 在页面加载后检查兼容性
    setTimeout(checkAudioCompatibility, 1000);

    // 添加快捷键支持
    document.addEventListener('keydown', function(e) {
        // 空格键控制播放/暂停
        if (e.code === 'Space' && audio && btn) {
            e.preventDefault(); // 防止页面滚动
            btn.click(); // 模拟点击按钮
        }
        
        // ESC键关闭所有弹窗
        if (e.code === 'Escape') {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                document.body.removeChild(msg);
            });
        }
    });
});
