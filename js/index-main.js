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
});
    // 背景音乐
const bgm = document.getElementById('bgm');
const btn = document.getElementById('bgmBtn');

btn.onclick = () => {
    if (bgm.paused) {
        bgm.play();
        btn.textContent = '关闭背景音';
        btn.classList.add('playing');
} 
    else {
        bgm.pause();
        btn.textContent = '播放背景音';
        btn.classList.remove('playing');
    }
};