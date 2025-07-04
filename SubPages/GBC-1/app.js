document.addEventListener('DOMContentLoaded', () => {
  // 初始化植物数据（模拟）
  const plantData = [
    {
      id: 'plant-1',
      name: '绿萝',
      scientificName: 'Epipremnum aureum',
      image: 'assets/plants/pothos.jpg',
      status: 'healthy',
      waterSchedule: '每7-10天',
      lastWatered: '2025-07-01',
      nextWater: '2025-07-08',
      light: '中等光照',
      difficulty: 1
    },
    {
      id: 'plant-2',
      name: '发财树',
      scientificName: 'Pachira aquatica',
      image: 'assets/plants/money-tree.jpg',
      status: 'warning',
      waterSchedule: '每12-14天',
      lastWatered: '2025-06-18',
      nextWater: '2025-07-02',
      light: '明亮散射光',
      difficulty: 2
    },
    {
      id: 'plant-3',
      name: '多肉植物',
      scientificName: 'Echeveria elegans',
      image: 'assets/plants/succulent.jpg',
      status: 'danger',
      waterSchedule: '每14-21天',
      lastWatered: '2025-06-10',
      nextWater: '2025-06-30',
      light: '充足光照',
      difficulty: 3
    }
  ];
  
  // 将数据存储到本地存储中
  localStorage.setItem('plantData', JSON.stringify(plantData));
  
  // 检查是否首次使用
  if (!localStorage.getItem('appInitialized')) {
    // 首次使用的初始化逻辑
    const emptyState = document.querySelector('.empty-state');
    const plantList = document.querySelectorAll('plant-card');
    
    if (emptyState && plantList.length === 0) {
      emptyState.style.display = 'flex';
    }
    
    localStorage.setItem('appInitialized', 'true');
  }
  
  // 配置全局触摸事件（实现左滑删除）
  setupSwipeGestures();
});

// 设置手势
function setupSwipeGestures() {
  let startX = 0;
  let currentCard = null;
  const threshold = 100;
  
  document.addEventListener('touchstart', (e) => {
    if (e.target.closest('plant-card')) {
      startX = e.touches[0].clientX;
      currentCard = e.target.closest('plant-card');
      currentCard.style.transition = '';
    }
  });
  
  document.addEventListener('touchmove', (e) => {
    if (!currentCard) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    if (diff < 0) {
      // 左滑
      currentCard.style.transform = `translateX(${diff}px)`;
    }
  });
  
  document.addEventListener('touchend', (e) => {
    if (!currentCard) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    
    currentCard.style.transition = 'transform 0.3s';
    
    if (diff < -threshold) {
      // 完成左滑删除手势
      currentCard.style.transform = 'translateX(-100%)';
      
      // 动画结束后移除卡片
      setTimeout(() => {
        const event = new CustomEvent('cardRemove', {
          bubbles: true,
          composed: true,
          detail: { id: currentCard.getAttribute('id') }
        });
        currentCard.dispatchEvent(event);
        currentCard.remove();
      }, 300);
    } else {
      // 未达阈值，恢复位置
      currentCard.style.transform = '';
    }
    
    currentCard = null;
  });
  
  // 处理卡片删除事件
  document.addEventListener('cardRemove', (e) => {
    const plantId = e.detail.id;
    
    // 从本地存储中移除
    const plantData = JSON.parse(localStorage.getItem('plantData') || '[]');
    const updatedData = plantData.filter(plant => plant.id !== plantId);
    localStorage.setItem('plantData', JSON.stringify(updatedData));
    
    // 如果没有植物了，显示空状态
    if (updatedData.length === 0) {
      const emptyState = document.querySelector('.empty-state');
      if (emptyState) emptyState.style.display = 'flex';
    }
  });
}