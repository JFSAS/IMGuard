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
            if (menuText === 'Dashboard') {
                window.location.href = 'dashboard.html';
            } else if (menuText === 'Project') {
                window.location.href = 'project.html';
            } else if (menuText === 'Data-Manage') {
                window.location.href = 'data-management.html';
            } else if (menuText === 'User') {
                window.location.href = 'user.html';
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

    // 标签页切换
    const tabs = document.querySelectorAll('.user-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签页的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签页添加active类
            this.classList.add('active');
            
            // 获取当前标签页对应的内容ID
            const tabId = this.getAttribute('data-tab');
            
            // 隐藏所有内容
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // 显示当前标签页对应的内容
            document.getElementById(tabId + '-content').classList.remove('hidden');
        });
    });

    // 项目选择功能
    const projectSelect = document.getElementById('project-select');
    const projectUsersContainer = document.getElementById('project-users-container');
    const projectEmpty = document.getElementById('project-empty');
    const projectName = document.getElementById('project-name');
    
    if (projectSelect) {
        projectSelect.addEventListener('change', function() {
            if (this.value) {
                // 显示项目用户列表
                projectUsersContainer.classList.remove('hidden');
                projectEmpty.classList.add('hidden');
                
                // 更新项目名称
                let selectedProjectName = '';
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].value === this.value) {
                        selectedProjectName = this.options[i].text;
                        break;
                    }
                }
                projectName.textContent = selectedProjectName;
                
                // 这里可以使用AJAX加载不同项目的用户列表
                // 以下为示例，实际中应替换为真实数据
                console.log('加载项目用户:', this.value);
            } else {
                // 未选择项目，显示空状态
                projectUsersContainer.classList.add('hidden');
                projectEmpty.classList.remove('hidden');
            }
        });
    }
    
    // 编辑用户角色功能
    const roleModal = document.getElementById('role-modal');
    const editRoleButtons = document.querySelectorAll('.btn-icon[title="修改角色"]');
    
    editRoleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal(roleModal);
            
            // 从列表项中获取用户信息，显示在模态框中
            const userRow = this.closest('tr');
            const userName = userRow.querySelector('.user-info-cell span').textContent;
            const userImage = userRow.querySelector('.user-avatar').src;
            const userRole = userRow.querySelector('.role').textContent;
            
            // 更新模态框中的用户信息
            document.querySelector('.modal-user-info h4').textContent = userName;
            document.querySelector('.modal-user-avatar').src = userImage;
            
            // 选择对应的角色
            const roleSelect = document.getElementById('role-select');
            for (let i = 0; i < roleSelect.options.length; i++) {
                if (roleSelect.options[i].text.toLowerCase() === userRole.toLowerCase()) {
                    roleSelect.selectedIndex = i;
                    break;
                }
            }
        });
    });
    
    // 新建用户按钮
    const newUserBtn = document.querySelector('.btn-primary');
    const newUserModal = document.getElementById('new-user-modal');
    
    if (newUserBtn) {
        newUserBtn.addEventListener('click', function() {
            showModal(newUserModal);
        });
    }
    
    // 分配项目按钮
    const assignProjectBtn = document.querySelector('.btn-secondary');
    
    if (assignProjectBtn) {
        assignProjectBtn.addEventListener('click', function() {
            // 检查是否有选中的用户
            const selectedUsers = document.querySelectorAll('tbody input[type="checkbox"]:checked');
            
            if (selectedUsers.length === 0) {
                alert('请先选择要分配项目的用户');
                return;
            }
            
            // 跳转到项目标签页
            document.querySelector('.tab[data-tab="by-project"]').click();
        });
    }
    
    // 添加项目成员按钮
    const addMemberBtn = document.querySelector('.btn-sm');
    
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', function() {
            if (!projectSelect.value) {
                alert('请先选择一个项目');
                return;
            }
            
            showModal(roleModal);
        });
    }
    
    // 角色修改和保存
    const saveRoleBtn = document.querySelector('#role-modal .save-btn');
    
    if (saveRoleBtn) {
        saveRoleBtn.addEventListener('click', function() {
            const userName = document.querySelector('.modal-user-info h4').textContent;
            const roleValue = document.getElementById('role-select').value;
            const roleText = document.getElementById('role-select').options[document.getElementById('role-select').selectedIndex].text;
            
            // 选中的项目权限
            const checkedProjects = Array.from(document.querySelectorAll('.permissions-list input:checked'))
                .map(checkbox => checkbox.parentElement.textContent.trim());
            
            alert(`已更新 ${userName} 的角色为 ${roleText}，授权项目：${checkedProjects.join(', ')}`);
            
            // 关闭模态框
            hideModal(roleModal);
        });
    }
    
    // 新建用户保存
    const saveNewUserBtn = document.querySelector('#new-user-modal .save-btn');
    
    if (saveNewUserBtn) {
        saveNewUserBtn.addEventListener('click', function() {
            const userName = document.getElementById('user-name').value;
            const userEmail = document.getElementById('user-email').value;
            const userRole = document.getElementById('user-role').value;
            const sendInvite = document.getElementById('send-invite').checked;
            
            // 验证表单
            if (!userName || !userEmail) {
                alert('请填写用户姓名和邮箱');
                return;
            }
            
            if (!validateEmail(userEmail)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 选中的项目
            const checkedProjects = Array.from(document.querySelectorAll('#new-user-modal .permissions-list input:checked'))
                .map(checkbox => checkbox.parentElement.textContent.trim());
            
            alert(`已创建用户 ${userName}，角色为 ${userRole}，授权项目：${checkedProjects.join(', ')}${sendInvite ? '，并已发送邀请邮件' : ''}`);
            
            // 关闭模态框并重置表单
            document.getElementById('new-user-modal').querySelector('form')?.reset();
            hideModal(newUserModal);
        });
    }
    
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
    });
    
    // 操作菜单点击事件
    const actionMenus = document.querySelectorAll('.action-menu');
    actionMenus.forEach(menu => {
        menu.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info-cell span').textContent;
            
            // 显示菜单（这里简化为提示框）
            const actions = [
                '编辑用户信息',
                '修改角色',
                '重置密码',
                '禁用账户'
            ];
            
            alert(`${userName} 的操作选项：\n${actions.join('\n')}`);
        });
    });
    
    // 移除用户按钮
    const removeUserBtns = document.querySelectorAll('.btn-icon[title="移除项目"]');
    
    removeUserBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info-cell span').textContent;
            if (confirm(`确定要将 ${userName} 从当前项目中移除吗？`)) {
                // 这里可以添加AJAX请求来实际删除用户
                this.closest('tr').remove();
            }
        });
    });
    
    // 全选功能
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // 当个别复选框状态改变时，检查是否需要更改全选复选框的状态
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // 检查是否所有复选框都被选中
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                // 检查是否有复选框被选中
                const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
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
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.user-table tbody tr');
            
            rows.forEach(row => {
                const userName = row.querySelector('.user-info-cell span').textContent.toLowerCase();
                const userEmail = row.cells[3]?.textContent.toLowerCase() || '';
                
                if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // 筛选功能
    const filterBtn = document.querySelector('.btn-filter');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    if (filterBtn && filterSelects.length) {
        filterBtn.addEventListener('click', function() {
            const roleFilter = filterSelects[0].value;
            const statusFilter = filterSelects[1].value;
            
            const rows = document.querySelectorAll('.user-table tbody tr');
            
            rows.forEach(row => {
                const userRole = row.querySelector('.role')?.textContent.toLowerCase() || '';
                const userStatus = row.querySelector('.status')?.textContent.toLowerCase() || '';
                
                let showByRole = roleFilter === 'all' || userRole.includes(roleFilter);
                let showByStatus = statusFilter === 'all' || userStatus.includes(statusFilter);
                
                if (showByRole && showByStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // 模态框通用处理
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-btn');
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // 点击模态框外部关闭
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this);
            }
        });
    });
    
    // 辅助函数
    function showModal(modal) {
        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}); 