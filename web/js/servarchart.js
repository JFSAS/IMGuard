// 服务器负载图表初始化函数
function initServerChart() {
    console.log('iamiin')
    const ctx = document.getElementById('serverChart');
    
    if (!ctx) return;
    
    // 生成随机数据
    const generateRandomData = (count, min, max) => {
        return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
    
    // 生成平滑的曲线数据
    const generateSmoothData = (count, min, max) => {
        let data = [];
        let value = Math.floor(Math.random() * (max - min) / 2) + min + (max - min) / 4;
        
        for (let i = 0; i < count; i++) {
            // 在当前值的基础上随机增减，但保持在范围内
            const change = Math.random() * 15 - 7.5;
            value += change;
            value = Math.max(min, Math.min(max, value));
            data.push(value);
        }
        
        return data;
    };
    
    // 横轴标签
    const labels = Array.from({length: 11}, (_, i) => `${i}`);
    
    // 图表数据
    const barData = generateRandomData(11, 10, 40);
    const yellowLineData = generateSmoothData(11, 20, 65);
    const blueLineData = generateSmoothData(11, 25, 60);
    
    // 设置canvas高度以适应容器
    ctx.parentElement.style.height = '320px';
    
    // 创建图表
    const serverChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Log Server',
                    data: barData,
                    backgroundColor: '#1976d2',
                    barPercentage: 0.4,
                    categoryPercentage: 0.7,
                    order: 3
                },
                {
                    label: 'Server B',
                    data: yellowLineData,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    fill: true,
                    tension: 0.4,
                    type: 'line',
                    pointRadius: 0,
                    order: 2
                },
                {
                    label: 'Server A',
                    data: blueLineData,
                    borderColor: '#03a9f4',
                    backgroundColor: 'rgba(3, 169, 244, 0.1)',
                    fill: true,
                    tension: 0.4,
                    type: 'line',
                    pointRadius: 0,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 80,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 20,
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        padding: 5
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 10
                }
            }
        }
    });
    
    // 刷新按钮点击时更新图表数据
    const refreshBtn = document.querySelector('.btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // 更新图表数据
            serverChart.data.datasets[0].data = generateRandomData(11, 10, 40);
            serverChart.data.datasets[1].data = generateSmoothData(11, 20, 65);
            serverChart.data.datasets[2].data = generateSmoothData(11, 25, 60);
            serverChart.update();
        });
    }
} 