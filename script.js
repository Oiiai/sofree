(function() {
    // 白名单（全匹配，不区分大小写）
    const KEYWORDS = [
        "福瑞",
        "腐锐",
        "骚福瑞",
        "selffree",
        "selfree",
        "sofree",
        "saofurui",
        "saofree",
        "solveray",
        "selfray",
        "furry",
        "furui",
        "sfr"
    ];

    const box = document.getElementById('box');
    const outputSpan = document.getElementById('output');
    const picShow = document.getElementById('picShow');

    // 检查文本是否包含任意关键词（不区分大小写）
    function containsKeyword(text) {
        const lowerText = text.toLowerCase();
        return KEYWORDS.some(keyword => lowerText.includes(keyword.toLowerCase()));
    }

    // 彩带动画函数
    function createConfetti() {
        // 清除现有彩带
        const container = document.getElementById('confetti-container');
        if (!container) return;
        
        container.innerHTML = '';

        // 彩带颜色
        const colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
            '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
            '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
        ];

        // 物理参数
        const gravity = 0.25;
        const initialVelocity = 20;
        const velocityVariation = 8;
        const dragCoefficient = 0.98;

        // 创建彩带 - 增加数量以创造更密集的效果
        for (let i = 0; i < 200; i++) {
            setTimeout(function() {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                // 随机彩带特性
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = Math.random() < 0.33 ? 'circle' : Math.random() < 0.66 ? 'rectangle' : 'triangle';
                const size = Math.random() * 10 + 5;

                // 从两侧喷出 - 随机选择左侧或右侧
                const side = Math.random() < 0.5 ? 'left' : 'right';
                const xPos = side === 'left' ? 0 : window.innerWidth;
                const yPos = window.innerHeight * 0.8 + Math.random() * window.innerHeight * 0.2;

                // 角度设置 - 更多向上的角度，像烟花发射
                let angle;
                if (side === 'left') {
                    angle = -Math.PI / 2 + (Math.random() * Math.PI) / 4;
                } else {
                    angle = (Math.PI * 3) / 2 - (Math.random() * Math.PI) / 4;
                }

                // 初始速度
                const velocity = initialVelocity + Math.random() * velocityVariation;

                // 设置初始位置和样式
                confetti.style.left = xPos + 'px';
                confetti.style.top = yPos + 'px';
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                confetti.style.backgroundColor = color;
                confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

                // 设置不同形状
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.backgroundColor = 'transparent';
                    confetti.style.borderLeft = size / 2 + 'px solid transparent';
                    confetti.style.borderRight = size / 2 + 'px solid transparent';
                    confetti.style.borderBottom = size + 'px solid ' + color;
                }

                container.appendChild(confetti);

                // 动画参数
                let xVelocity = Math.cos(angle) * velocity;
                let yVelocity = Math.sin(angle) * velocity;
                const rotateVel = Math.random() * 0.2 - 0.1;
                let rotation = Math.random() * 360;

                // 时间跟踪（毫秒）
                let time = 0;
                const initialBurstDuration = 500;
                let lastTimestamp = performance.now();

                // 动画函数
                function animate(timestamp) {
                    const deltaTime = timestamp - lastTimestamp;
                    lastTimestamp = timestamp;
                    time += deltaTime;

                    // 应用物理效果
                    if (time < initialBurstDuration) {
                        yVelocity *= 0.99;
                        xVelocity *= 0.99;
                    } else {
                        yVelocity += gravity;
                        xVelocity *= dragCoefficient;
                    }

                    // 更新位置
                    const currentX = parseFloat(confetti.style.left);
                    const currentY = parseFloat(confetti.style.top);
                    confetti.style.left = currentX + xVelocity + 'px';
                    confetti.style.top = currentY + yVelocity + 'px';

                    // 旋转彩带
                    rotation += rotateVel;
                    confetti.style.transform = 'rotate(' + rotation + 'deg)';

                    // 超出屏幕移除彩带
                    if (currentY < window.innerHeight + 100 &&
                        currentX > -100 &&
                        currentX < window.innerWidth + 100) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                }

                requestAnimationFrame(animate);
            }, Math.random() * 800);
        }
    }

    // 显示“扫福瑞”并带动画，同时显示图片和彩带
    function showSaofurui() {
        // 移除已有动画类，重新触发
        outputSpan.classList.remove('pop');
        void outputSpan.offsetWidth;
        outputSpan.classList.add('pop');
        outputSpan.textContent = '🤣 扫福瑞叫爸爸 🤣';
        
        // 显示图片
        showPicture();
        
        // 触发彩带动画
        createConfetti();
    }

    // 显示图片
    function showPicture() {
        if (picShow && !picShow.classList.contains('show')) {
            picShow.classList.add('show');
        }
    }

    // 隐藏图片
    function hidePicture() {
        if (picShow && picShow.classList.contains('show')) {
            picShow.classList.remove('show');
        }
    }

    // 清空输出并隐藏图片
    function clearOutput() {
        if (outputSpan.textContent !== '') {
            outputSpan.textContent = '';
        }
        hidePicture();
    }

    // 处理回车事件
    function onEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const rawValue = box.value;
            if (rawValue.trim() === '') {
                clearOutput();
                return;
            }
            if (containsKeyword(rawValue)) {
                showSaofurui();
            } else {
                clearOutput();
            }
        }
    }

    // 当输入框内容变化时，如果不包含关键词则清空输出和图片
    function onInputChange() {
        const val = box.value;
        if (val.trim() === '') {
            clearOutput();
            return;
        }
        if (!containsKeyword(val)) {
            if (outputSpan.textContent !== '') {
                clearOutput();
            }
        }
    }

    // 监听回车
    box.addEventListener('keypress', onEnter);
    // 监听输入变化
    box.addEventListener('input', onInputChange);

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        .output.pop {
            animation: bouncePop 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
            color: #b45f2b;
            background: #ffefe2;
            transform: scale(1.02);
        }
        @keyframes bouncePop {
            0% { opacity: 0.6; transform: scale(0.92); }
            70% { transform: scale(1.06); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
})();