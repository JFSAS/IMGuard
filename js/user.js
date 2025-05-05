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

    // 表格行交互效果
    const tableRows = document.querySelectorAll('.user-table tbody tr');
    tableRows.forEach(row => {
        // 鼠标悬停效果
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
        });
        row.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
        
        // 点击更多按钮显示菜单
        const moreButton = row.querySelector('.material-icons');
        if (moreButton) {
            moreButton.addEventListener('click', function(e) {
                e.stopPropagation();
                alert('显示用户操作菜单');
                // 这里可以实现一个下拉菜单
            });
        }
    });

    // 新建用户按钮点击事件
    const newUserBtn = document.querySelector('.btn-primary');
    if (newUserBtn) {
        newUserBtn.addEventListener('click', function() {
            alert('新建用户功能');
            // 这里可以显示一个创建用户的表单或弹窗
        });
    }

    // 筛选按钮点击事件
    const filterBtn = document.querySelector('.btn-filter');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('筛选用户');
            // 这里可以实现筛选功能
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
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            alert('上一页');
            // 这里可以实现分页逻辑
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            alert('下一页');
            // 这里可以实现分页逻辑
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