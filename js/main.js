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

    // 背景音乐
    const audio = document.getElementById('bgm');
    const btn = document.getElementById('bgmBtn');
    
    if (audio && btn) {
        btn.textContent = audio.paused ? '播放背景音乐(Bad Apple 25时&钢琴版)' : '暂停背景音乐';
        
        btn.addEventListener('click', function() {
            if (audio.paused) {
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // 播放成功
                        btn.textContent = '暂停背景音乐';
                        btn.classList.add('playing');
                    }).catch(error => {
                        // 播放失败
                        console.error('播放失败:', error);
                        alert('音频播放失败，请检查音频文件或浏览器设置。\n\n可能的原因：\n1. 浏览器自动播放策略限制\n2. 音频文件格式不支持');
                    });
                }
            } else {
                // 暂停音乐
                audio.pause();
                btn.textContent = '继续播放音乐';
                btn.classList.remove('playing');
            }
        });
        
        // 添加音频加载错误处理
        audio.addEventListener('error', function(e) {
            console.error('音频加载错误:', e);
            console.log('音频错误代码:', audio.error.code);
            console.log('音频错误信息:', audio.error.message);
            
            if (audio.error) {
                switch(audio.error.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        alert('音频加载被中止');
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        alert('网络错误，音频加载失败');
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        alert('音频解码错误');
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        alert('音频格式不支持或文件路径错误');
                        break;
                    default:
                        alert('音频加载失败，请检查音频文件');
                }
            }
            
            // 禁用播放按钮
            btn.disabled = true;
            btn.textContent = '❌ 音频不可用';
            btn.style.opacity = '0.5';
        });
    }

});

