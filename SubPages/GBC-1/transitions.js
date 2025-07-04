// 页面过渡效果管理
class PageTransitionManager {
  constructor() {
    this.currentPage = null;
    this.pageHistory = [];
  }
  
  // 页面切换动画
  navigateTo(pageId, direction = 'forward') {
    const fromPage = document.querySelector('.page.active');
    const toPage = document.getElementById(pageId);
    
    if (!toPage) return console.error(`页面 ${pageId} 不存在`);
    
    // 设置初始位置
    if (direction === 'forward') {
      toPage.style.transform = 'translateX(100%)';
    } else {
      toPage.style.transform = 'translateX(-100%)';
    }
    
    toPage.classList.add('page', 'page-transition');
    toPage.style.display = 'block';
    
    // 强制重绘
    toPage.offsetWidth;
    
    // 执行过渡
    requestAnimationFrame(() => {
      if (fromPage) {
        fromPage.style.transform = direction === 'forward' 
          ? 'translateX(-100%)' 
          : 'translateX(100%)';
        fromPage.classList.remove('active');
      }
      
      toPage.style.transform = 'translateX(0)';
      toPage.classList.add('active');
      
      // 更新历史
      if (direction === 'forward') {
        if (fromPage) this.pageHistory.push(fromPage.id);
      } else {
        this.pageHistory.pop();
      }
      
      this.currentPage = pageId;
    });
    
    // 清理过渡结束后的状态
    const onTransitionEnd = () => {
      if (fromPage && !fromPage.classList.contains('active')) {
        fromPage.style.display = 'none';
      }
      toPage.removeEventListener('transitionend', onTransitionEnd);
    };
    
    toPage.addEventListener('transitionend', onTransitionEnd);
  }
  
  // 返回上一页
  goBack() {
    if (this.pageHistory.length > 0) {
      const prevPageId = this.pageHistory[this.pageHistory.length - 1];
      this.navigateTo(prevPageId, 'backward');
    }
  }
}

// 初始化并导出管理器
const transitionManager = new PageTransitionManager();
window.pageTransitions = transitionManager;