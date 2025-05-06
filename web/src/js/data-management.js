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

    // 标签页切换
    const tabs = document.querySelectorAll('.tab');
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

    // 文件上传功能
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    const uploadBtn = document.querySelector('.btn-upload');
    
    if (uploadArea && fileInput) {
        // 点击上传区域时触发文件选择
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // 文件选择后的处理
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFiles(this.files);
            }
        });
        
        // 拖放文件功能
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                handleFiles(e.dataTransfer.files);
            }
        });
        
        // 点击上传按钮
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止冒泡到uploadArea
                fileInput.click();
            });
        }
    }
    
    // 处理上传的文件
    function handleFiles(files) {
        // 显示上传进度区域
        const uploadCard = document.querySelector('.upload-card');
        const uploadProgress = document.querySelector('.upload-progress');
        
        if (uploadCard && uploadProgress) {
            uploadCard.classList.add('hidden');
            uploadProgress.classList.remove('hidden');
            
            // 这里只是模拟上传进度，实际中应替换为真实的上传逻辑
            simulateUploadProgress(files);
        }
    }
    
    // 模拟上传进度
    function simulateUploadProgress(files) {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const cancelBtn = document.querySelector('.btn-cancel');
        
        if (!progressBar || !progressText) return;
        
        let progress = 0;
        const totalFiles = files.length;
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        
        // 更新文件名显示
        console.log('上传文件:', fileNames);
        
        const interval = setInterval(() => {
            progress += 5;
            
            if (progress <= 100) {
                progressBar.style.width = progress + '%';
                progressText.textContent = progress + '% 已完成';
            } else {
                clearInterval(interval);
                
                // 上传完成后显示设置区域
                setTimeout(() => {
                    document.querySelector('.upload-progress').classList.add('hidden');
                    document.querySelector('.upload-settings').classList.remove('hidden');
                }, 500);
            }
        }, 200);
        
        // 取消上传
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                clearInterval(interval);
                document.querySelector('.upload-progress').classList.add('hidden');
                document.querySelector('.upload-card').classList.remove('hidden');
            });
        }
    }
    
    // 数据表格功能
    // 全选/取消全选
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    if (selectAll && checkboxes.length > 0) {
        selectAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // 当个别复选框状态改变时，检查是否需要更改全选复选框的状态
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // 检查是否所有复选框都被选中
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                // 检查是否有复选框被选中
                const someChecked = Array.from(checkboxes).some(cb => cb.checked);
                
                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // 编辑按钮点击事件
    const editButtons = document.querySelectorAll('.btn-icon[title="编辑"]');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 显示数据详情模态框
            openModal('data-details-modal');
        });
    });
    
    // 分页功能
    const pageButtons = document.querySelectorAll('.page-btn:not(:first-child):not(:last-child)');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加加载对应页数据的逻辑
        });
    });
    
    // 打开模态框
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            
            // 关闭按钮点击事件
            const closeBtn = modal.querySelector('.close-modal');
            const cancelBtn = modal.querySelector('.btn-secondary');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }
            
            // 点击模态框外部关闭模态框
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }
    
    // 标签管理
    const tagRemoveButtons = document.querySelectorAll('.tag-remove');
    tagRemoveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // 移除标签
            this.parentElement.remove();
        });
    });
    
    // 模态框内的标签切换
    const detailsTabs = document.querySelectorAll('.details-tab');
    detailsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            detailsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加显示对应内容的逻辑
        });
    });
    
    // 开关切换
    const switchInputs = document.querySelectorAll('.switch input');
    switchInputs.forEach(input => {
        input.addEventListener('change', function() {
            const switchText = this.parentElement.nextElementSibling;
            if (switchText) {
                switchText.textContent = this.checked ? '已启用' : '已禁用';
            }
        });
    });
    
    // 刷新按钮点击事件
    const refreshBtn = document.querySelector('.btn-secondary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // 显示加载动画
            this.disabled = true;
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="material-icons rotating">refresh</span>刷新中...';
            
            // 模拟刷新操作
            setTimeout(() => {
                // 恢复按钮状态
                this.disabled = false;
                this.innerHTML = originalText;
                alert('数据已刷新');
            }, 1000);
        });
    }
    
    // 上传新数据按钮点击事件
    const newDataBtn = document.querySelector('.btn-primary');
    if (newDataBtn) {
        newDataBtn.addEventListener('click', function() {
            // 切换到上传标签页
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector('.tab[data-tab="upload"]').classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            document.getElementById('upload-content').classList.remove('hidden');
            
            // 重置上传区域
            document.querySelector('.upload-card').classList.remove('hidden');
            document.querySelector('.upload-progress').classList.add('hidden');
            document.querySelector('.upload-settings').classList.add('hidden');
        });
    }

    // 保存设置按钮点击事件
    const saveSettingsBtn = document.querySelector('.upload-settings .btn-primary');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // 隐藏上传设置区域
            document.querySelector('.upload-settings').classList.add('hidden');
            document.querySelector('.upload-card').classList.remove('hidden');
            
            // 切换到数据管理标签页
            const manageTab = document.querySelector('.tab[data-tab="manage"]');
            if (manageTab) {
                // 模拟点击管理标签页
                manageTab.click();
                
                // 显示成功提示
                showNotification('数据集已成功保存！');
            }
        });
    }

    // 显示通知提示
    function showNotification(message) {
        // 检查是否已存在通知元素
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            // 创建通知元素
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // 设置通知内容和样式
        notification.textContent = message;
        notification.style.display = 'block';
        
        // 淡入效果
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后淡出并移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }
}); 