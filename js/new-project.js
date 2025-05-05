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

    // 数据集复选框选择
    const checkboxes = document.querySelectorAll('input[name="dataset"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedCount();
        });
    });

    // 更新已选数据集数量
    function updateSelectedCount() {
        const selectedCount = document.querySelectorAll('input[name="dataset"]:checked').length;
        const createBtn = document.querySelector('.create-btn');
        
        if (selectedCount > 0) {
            createBtn.textContent = `创建项目 (${selectedCount}个数据集)`;
        } else {
            createBtn.textContent = '创建项目';
        }
    }

    // 分页功能
    const pageButtons = document.querySelectorAll('.page-btn:not(:first-child):not(:last-child)');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加加载对应页数据的逻辑
            console.log('切换到页码:', this.textContent);
        });
    });

    // 搜索框功能
    const searchInput = document.querySelector('.dataset-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const datasetItems = document.querySelectorAll('.dataset-item');
            
            datasetItems.forEach(item => {
                const datasetName = item.querySelector('h4').textContent.toLowerCase();
                if (datasetName.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 表单提交事件
    const projectForm = document.querySelector('.project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const projectName = document.getElementById('projectName').value;
            const projectDescription = document.getElementById('projectDescription').value;
            const selectedDatasets = Array.from(document.querySelectorAll('input[name="dataset"]:checked')).map(cb => cb.value);
            const processingMethod = document.querySelector('input[name="process-method"]:checked').nextElementSibling.textContent;
            
            // 简单的表单验证
            if (!projectName) {
                alert('请输入项目名称');
                return;
            }
            
            if (selectedDatasets.length === 0) {
                alert('请至少选择一个数据集');
                return;
            }
            
            // 打印表单数据 - 实际应用中这里会发送到服务器
            console.log('项目名称:', projectName);
            console.log('项目描述:', projectDescription);
            console.log('选择的数据集:', selectedDatasets);
            console.log('处理方法:', processingMethod);
            
            // 模拟成功创建项目后跳转
            alert('项目创建成功！');
            window.location.href = 'project.html';
        });
    }

    // 取消按钮点击事件
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('确定要取消创建项目吗？所有输入将被丢弃。')) {
                window.location.href = 'project.html';
            }
        });
    }

    // 上传新数据集按钮点击事件
    const uploadDataBtn = document.querySelector('.secondary-btn');
    if (uploadDataBtn) {
        uploadDataBtn.addEventListener('click', function() {
            window.location.href = 'data-management.html';
        });
    }
}); 