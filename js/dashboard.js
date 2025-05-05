document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏菜单切换
    const menuItems = document.querySelectorAll('.nav-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 根据点击的菜单项进行页面导航
            const menuSpan = this.querySelector('span');
            const menuText = menuSpan ? menuSpan.textContent.trim() : '';
            console.log(menuText);
            if (menuText === 'Dashboard') {
                window.location.href = 'dashboard.html';
            } else if (menuText === 'Project') {
                window.location.href = 'project.html';
            } else if (menuText === 'Login') {
                window.location.href = 'index.html';
            } else if (menuText === 'User') {
                window.location.href = 'user.html';
            } else if (menuText === 'Register') {
                window.location.href = 'register.html';
            }
        });
    });
    // 菜单按钮点击事件
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const contentArea = document.querySelector('.content-area');
    
    menuIcon.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '64px';
            contentArea.style.marginLeft = '64px';
            // 隐藏文本内容
            document.querySelectorAll('.nav-menu li span, .user-info').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            sidebar.style.width = 'var(--sidebar-width)';
            contentArea.style.marginLeft = 'var(--sidebar-width)';
            // 显示文本内容
            document.querySelectorAll('.nav-menu li span, .user-info').forEach(el => {
                el.style.display = 'block';
            });
        }
    });

    // 刷新按钮点击事件
    const refreshBtn = document.querySelector('.btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // 显示加载动画
            this.disabled = true;
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="material-icons rotating">refresh</span>正在刷新...';
            
            // 模拟刷新操作
            setTimeout(() => {
                // 恢复按钮状态
                this.disabled = false;
                this.innerHTML = originalText;
                alert('刷新完成');
            }, 1500);
        });
    }

   
    // 卡片交互效果
    const cardHeaders = document.querySelectorAll('.card-header .material-icons');
    cardHeaders.forEach(icon => {
        icon.addEventListener('click', function() {
            alert('卡片操作菜单');
            // 这里可以实现卡片的更多操作
        });
    });
    
    // 初始化服务器负载图表
    initServerChart();
});

