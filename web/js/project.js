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
            } else if (menuText === 'Data-Manage') {
                window.location.href = 'data-management.html';
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

    // 表格行交互效果
    const tableRows = document.querySelectorAll('.project-table tbody tr');
    tableRows.forEach(row => {
        // 鼠标悬停效果
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
        });
        row.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
        
    });

    // 新建项目按钮点击事件
    const newProjectBtn = document.querySelector('.btn-primary');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', function() {
            window.location.href = 'new-project.html';
        });
    }

    // 全选功能
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    // 分页功能模拟
    const paginationSelect = document.querySelector('.pagination select');
    if (paginationSelect) {
        paginationSelect.addEventListener('change', function() {
            alert(`每页显示 ${this.value} 条记录`);
            // 这里可以实现分页逻辑
        });
    }

    // 分页按钮
    const prevPageBtn = document.querySelector('.pagination button:first-of-type');
    const nextPageBtn = document.querySelector('.pagination button:last-of-type');
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (!this.disabled) {
                alert('下一页');
                // 这里可以实现分页逻辑
            }
        });
    }

    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                alert(`搜索：${this.value}`);
                // 这里可以实现搜索逻辑
            }
        });
    }
}); 