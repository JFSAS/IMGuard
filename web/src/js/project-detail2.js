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

    // 初始化标签页切换
    initTabs();
    
    // 初始化分类图表
    initCategoryChart();
    
    // 开始训练按钮事件
    const startTrainingBtn = document.getElementById('start-training-btn');
    if (startTrainingBtn) {
        startTrainingBtn.addEventListener('click', startTraining);
    }
    
    // 训练标签页中的开始训练按钮
    const newTrainingBtn = document.getElementById('new-training-btn');
    if (newTrainingBtn) {
        newTrainingBtn.addEventListener('click', startTraining);
    }
    
    // 添加指标选择器事件监听
    const metricSelect = document.getElementById('metric-select');
    if (metricSelect) {
        metricSelect.addEventListener('change', function() {
            updateMetricChart(this.value);
        });
    }
});

// 标签页切换功能
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的激活状态
            this.classList.add('active');
            
            // 隐藏所有内容
            const allContents = document.querySelectorAll('.tab-content');
            allContents.forEach(content => content.classList.add('hidden'));
            
            // 显示当前标签对应的内容
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
        });
    });
}

// 开始训练
function startTraining() {
    // 更新训练控制面板状态
    const statusIcon = document.querySelector('.status-icon');
    const statusTitle = document.querySelector('.status-info h4');
    const statusDesc = document.querySelector('.status-info p');
    
    // 更改图标和文本
    statusIcon.classList.add('running');
    statusIcon.querySelector('.material-icons').textContent = 'sync';
    statusTitle.textContent = '训练进行中';
    statusDesc.textContent = '模型正在训练中，请耐心等待...';
    
    // 更新按钮状态
    document.getElementById('start-training-btn').disabled = true;
    const actionButtons = document.querySelectorAll('.training-actions button');
    actionButtons[1].disabled = false; // 启用暂停按钮
    actionButtons[2].disabled = false; // 启用停止按钮
    
    // 显示训练图表
    const trainingCharts = document.querySelectorAll('.training-charts');
    trainingCharts.forEach(chart => chart.classList.remove('hidden'));
    
    // 初始化图表
    initTrainingChart();
    initServerChart();
    initMetricChart();
    
    // 更新训练预计时间显示
    const configItems = document.querySelectorAll('.config-item');
    if (configItems.length >= 6) {
        const timeConfig = configItems[5].querySelector('.config-value');
        if (timeConfig) {
            timeConfig.textContent = "~1小时";
        }
    }
    
    // 更新项目状态
    const projectStatus = document.querySelector('.project-status .status');
    projectStatus.textContent = '训练中';
    projectStatus.className = 'status error'; // 使用红色表示训练中
    
    // 添加训练记录到表格
    updateTrainingRecords();
    
    // 添加活动记录
    addActivityItem('开始训练', `${getUserName()}启动了模型训练`);
    
    // 更新训练进度
    startTrainingProgress();
}

// 更新训练记录
function updateTrainingRecords() {
    // 隐藏空状态
    document.getElementById('empty-training-state').classList.add('hidden');
    
    // 显示训练记录表格
    document.getElementById('training-records').classList.remove('hidden');
    
    // 获取当前时间
    const now = new Date();
    const formattedTime = now.toLocaleString('zh-CN');
    
    // 添加新的训练记录
    const trainingTable = document.getElementById('training-records-table');
    
    const newRow = trainingTable.insertRow(0);
    newRow.innerHTML = `
        <td>TRAIN-001</td>
        <td>${formattedTime}</td>
        <td>进行中</td>
        <td>ResNet50, batch=32</td>
        <td><span class="status error">训练中</span></td>
        <td>--</td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" title="查看详情"><span class="material-icons">visibility</span></button>
                <button class="btn-icon" title="停止"><span class="material-icons">stop</span></button>
            </div>
        </td>
    `;
}

// 获取随机用户名
function getUserName() {
    const users = ['Beth Pacocha', 'Jaydon Frankie', 'Alex Robinson'];
    return users[Math.floor(Math.random() * users.length)];
}

// 添加活动记录
function addActivityItem(title, desc) {
    const activityList = document.getElementById('activity-list');
    const now = new Date();
    
    // 格式化时间
    const formattedTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/\//g, '-');
    
    // 创建新活动条目
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-time">${formattedTime}</div>
        <div class="activity-icon">
            <span class="material-icons">play_arrow</span>
        </div>
        <div class="activity-content">
            <div class="activity-title">${title}</div>
            <div class="activity-desc">${desc}</div>
        </div>
    `;
    
    // 添加到活动列表的开头
    activityList.insertBefore(newActivity, activityList.firstChild);
}

// 开始训练进度更新
function startTrainingProgress() {
    let currentEpoch = 0;
    const totalEpochs = 100;
    
    // 使用真实计时
    const startTime = new Date();
    
    // 更新训练时间的函数
    function updateTrainingTime() {
        const now = new Date();
        const elapsedMs = now - startTime;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        
        let timeDisplay = '';
        if (hours > 0) {
            timeDisplay = `${hours}小时${minutes}分钟`;
        } else if (minutes > 0) {
            timeDisplay = `${minutes}分钟${seconds}秒`;
        } else {
            timeDisplay = `${seconds}秒`;
        }
        
        document.getElementById('training-time').textContent = timeDisplay;
    }
    
    // 每秒更新一次训练时间
    const timeInterval = setInterval(updateTrainingTime, 1000);
    
    // 模拟训练进度，每次更新间隔更长，模拟真实训练时间
    const progressInterval = setInterval(() => {
        // 更新当前轮次
        currentEpoch++;
        document.getElementById('current-epoch').textContent = `${currentEpoch}/${totalEpochs}`;
        
        // 更新进度条
        const progressPercent = Math.round((currentEpoch / totalEpochs) * 100);
        const progressBar = document.getElementById('progress-bar-fill');
        progressBar.style.width = `${progressPercent}%`;
        progressBar.textContent = `${progressPercent}%`;
        
        // 更新图表数据
        updateTrainingChartData(currentEpoch, totalEpochs);
        updateMetricChartData(currentEpoch, totalEpochs);
        updateServerChartData();
        
        // 如果进度完成，清除定时器
        if (currentEpoch >= totalEpochs) {
            clearInterval(progressInterval);
            clearInterval(timeInterval);
            finishTraining(startTime);
        }
    }, 5000); // 增加到3秒，使模拟更真实
}

// 完成训练
function finishTraining(startTime) {
    // 更新训练控制面板状态
    const statusIcon = document.querySelector('.status-icon');
    const statusTitle = document.querySelector('.status-info h4');
    const statusDesc = document.querySelector('.status-info p');
    
    // 更改图标和文本
    statusIcon.classList.remove('running');
    statusIcon.classList.add('completed');
    statusIcon.querySelector('.material-icons').textContent = 'check_circle';
    statusTitle.textContent = '训练完成';
    statusDesc.textContent = '模型训练已成功完成，可以在训练记录中查看详情。';
    
    // 更新按钮状态
    document.getElementById('start-training-btn').disabled = false;
    const actionButtons = document.querySelectorAll('.training-actions button');
    actionButtons[1].disabled = true;  // 禁用暂停按钮
    actionButtons[2].disabled = true;  // 禁用停止按钮
    
    // 更新项目状态
    const projectStatus = document.querySelector('.project-status .status');
    projectStatus.textContent = '已完成';
    projectStatus.className = 'status success';
    
    // 更新准确率
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = '92.8%';
    
    // 计算实际训练时长
    const endTime = new Date();
    const trainingDuration = endTime - startTime;
    const seconds = Math.floor(trainingDuration / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const trainingTimeStr = `${hours}小时${minutes}分钟`;
    
    // 更新训练记录
    const trainRow = document.querySelector('#training-records-table tr:first-child');
    if (trainRow) {
        trainRow.cells[2].textContent = trainingTimeStr;
        trainRow.cells[4].innerHTML = '<span class="status success">已完成</span>';
        trainRow.cells[5].textContent = 'Acc=92.8%';
        trainRow.cells[6].querySelector('.material-icons:last-child').textContent = 'file_download';
    }
    
    // 添加活动记录
    addActivityItem('训练完成', `模型训练成功完成，准确率达到92.8%，用时${trainingTimeStr}`);
}

// 训练进度图表
function initTrainingChart() {
    const ctx = document.getElementById('trainingChart').getContext('2d');
    
    window.trainingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0'],
            datasets: [
                {
                    label: '训练损失',
                    data: [1.0],
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '验证损失',
                    data: [1.1],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '损失值'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '迭代次数 (Epoch)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

// 更新训练图表数据
function updateTrainingChartData(currentEpoch, totalEpochs) {
    if (!window.trainingChart) return;
    
    // 模拟损失下降
    const trainLoss = 1.0 * Math.exp(-3 * currentEpoch / totalEpochs);
    const valLoss = 1.1 * Math.exp(-2.85 * currentEpoch / totalEpochs);
    
    // 添加新的标签和数据点
    window.trainingChart.data.labels.push(currentEpoch.toString());
    window.trainingChart.data.datasets[0].data.push(trainLoss);
    window.trainingChart.data.datasets[1].data.push(valLoss);
    
    // 更新图表
    window.trainingChart.update();
}

// 服务器负载图表
function initServerChart() {
    const ctx = document.getElementById('serverChart').getContext('2d');
    
    // 初始标签 - 设置为每15分钟一个数据点，更符合慢速训练
    const initialLabels = Array(12).fill(0).map((_, i) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - (11 - i) * 15);
        return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    });
    
    // 初始数据
    const initialGPUData = Array(12).fill(0);
    const initialCPUData = Array(12).fill(0);
    const initialMemData = Array(12).fill(0);
    
    window.serverChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialLabels,
            datasets: [
                {
                    label: 'GPU使用率 (%)',
                    data: initialGPUData,
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.5)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: 'CPU使用率 (%)',
                    data: initialCPUData,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.5)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: '内存使用 (GB)',
                    data: initialMemData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: '使用率 (%)'
                    },
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: '内存 (GB)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// 更新服务器负载图表
function updateServerChartData() {
    if (!window.serverChart) return;
    
    // 获取当前时间
    const now = new Date();
    const timeLabel = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    // 生成更真实的服务器负载数据，训练过程中保持相对稳定的高负载
    const gpuUsage = 85 + Math.random() * 10; // 训练时GPU负载更高更稳定
    const cpuUsage = 50 + Math.random() * 10;
    const memUsage = 14 + Math.random() * 2;
    
    // 移除第一个数据点，添加新数据点
    window.serverChart.data.labels.shift();
    window.serverChart.data.labels.push(timeLabel);
    
    window.serverChart.data.datasets[0].data.shift();
    window.serverChart.data.datasets[0].data.push(gpuUsage);
    
    window.serverChart.data.datasets[1].data.shift();
    window.serverChart.data.datasets[1].data.push(cpuUsage);
    
    window.serverChart.data.datasets[2].data.shift();
    window.serverChart.data.datasets[2].data.push(memUsage);
    
    // 更新图表
    window.serverChart.update();
}

// 训练指标图表
function initMetricChart() {
    const ctx = document.getElementById('metricChart').getContext('2d');
    
    window.metricData = {
        loss: {
            train: [1.0],
            val: [1.1]
        },
        accuracy: {
            train: [0.1],
            val: [0.05]
        },
        precision: {
            train: [0.12],
            val: [0.08]
        },
        recall: {
            train: [0.15],
            val: [0.1]
        }
    };
    
    window.metricChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0'],
            datasets: [
                {
                    label: '训练损失',
                    data: window.metricData.loss.train,
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '验证损失',
                    data: window.metricData.loss.val,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '损失值'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '迭代次数 (Epoch)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

// 更新训练指标图表数据
function updateMetricChartData(currentEpoch, totalEpochs) {
    if (!window.metricChart || !window.metricData) return;
    
    // 模拟各个指标的变化
    const trainLoss = 1.0 * Math.exp(-3 * currentEpoch / totalEpochs);
    const valLoss = 1.1 * Math.exp(-2.85 * currentEpoch / totalEpochs);
    
    const trainAcc = 0.1 + 0.85 * (1 - Math.exp(-5 * currentEpoch / totalEpochs));
    const valAcc = 0.05 + 0.87 * (1 - Math.exp(-4.8 * currentEpoch / totalEpochs));
    
    const trainPrec = 0.12 + 0.83 * (1 - Math.exp(-5.2 * currentEpoch / totalEpochs));
    const valPrec = 0.08 + 0.84 * (1 - Math.exp(-5 * currentEpoch / totalEpochs));
    
    const trainRecall = 0.15 + 0.8 * (1 - Math.exp(-4.8 * currentEpoch / totalEpochs));
    const valRecall = 0.1 + 0.82 * (1 - Math.exp(-4.5 * currentEpoch / totalEpochs));
    
    // 保存新数据
    window.metricData.loss.train.push(trainLoss);
    window.metricData.loss.val.push(valLoss);
    window.metricData.accuracy.train.push(trainAcc);
    window.metricData.accuracy.val.push(valAcc);
    window.metricData.precision.train.push(trainPrec);
    window.metricData.precision.val.push(valPrec);
    window.metricData.recall.train.push(trainRecall);
    window.metricData.recall.val.push(valRecall);
    
    // 添加新的标签
    window.metricChart.data.labels.push(currentEpoch.toString());
    
    // 根据当前选择的指标更新图表
    const currentMetric = document.getElementById('metric-select').value;
    updateMetricChart(currentMetric);
}

// 更新训练指标图表
function updateMetricChart(metricType) {
    if (!window.metricChart || !window.metricData) return;
    
    let label1, label2, data1, data2, yAxisLabel;
    
    switch(metricType) {
        case 'loss':
            label1 = '训练损失';
            label2 = '验证损失';
            data1 = window.metricData.loss.train;
            data2 = window.metricData.loss.val;
            yAxisLabel = '损失值';
            break;
        case 'accuracy':
            label1 = '训练准确率';
            label2 = '验证准确率';
            data1 = window.metricData.accuracy.train;
            data2 = window.metricData.accuracy.val;
            yAxisLabel = '准确率';
            break;
        case 'precision':
            label1 = '训练精确率';
            label2 = '验证精确率';
            data1 = window.metricData.precision.train;
            data2 = window.metricData.precision.val;
            yAxisLabel = '精确率';
            break;
        case 'recall':
            label1 = '训练召回率';
            label2 = '验证召回率';
            data1 = window.metricData.recall.train;
            data2 = window.metricData.recall.val;
            yAxisLabel = '召回率';
            break;
    }
    
    window.metricChart.data.datasets[0].label = label1;
    window.metricChart.data.datasets[0].data = data1;
    window.metricChart.data.datasets[1].label = label2;
    window.metricChart.data.datasets[1].data = data2;
    
    window.metricChart.options.scales.y.title.text = yAxisLabel;
    
    window.metricChart.update();
}

// 类别分布图表
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    const categoryData = {
        labels: [
            '风景', '建筑', '人物', '食物', '动物', '植物', 
            '交通工具', '家具', '电子产品', '服装', '运动', '其他'
        ],
        datasets: [{
            label: '图片数量',
            data: [1250, 935, 1420, 875, 630, 520, 710, 425, 590, 680, 375, 340],
            backgroundColor: [
                '#1976d2', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#3498db',
                '#1abc9c', '#f1c40f', '#34495e', '#16a085', '#27ae60', '#d35400'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: categoryData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '图片数量'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '类别'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `数量: ${context.parsed.y} (${((context.parsed.y / 8750) * 100).toFixed(1)}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 移动端菜单切换
document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
}); 