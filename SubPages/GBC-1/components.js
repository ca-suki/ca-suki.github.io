// 植物卡片组件
class PlantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // 创建卡片内容
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .plant-card {
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin: 12px;
          position: relative;
          transform: perspective(800px) rotateX(15deg);
          transition: transform 0.3s;
        }
        .plant-card:active {
          transform: perspective(800px) rotateX(15deg) scale(0.98);
        }
        .plant-image {
          height: 120px;
          background-size: cover;
          background-position: center;
        }
        .plant-info {
          padding: 12px;
        }
        .plant-name {
          font: 600 16px/1.4 'HarmonyOS Sans', sans-serif;
          margin: 0 0 4px 0;
        }
        .plant-status {
          display: flex;
          align-items: center;
          font: 400 14px/1.4 'HarmonyOS Sans', sans-serif;
        }
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .status-text {
          font-size: 12px;
        }
        .card-highlight {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.7);
        }
      </style>
      
      <div class="plant-card">
        <div class="plant-image"></div>
        <div class="card-highlight"></div>
        <div class="plant-info">
          <h3 class="plant-name"></h3>
          <div class="plant-status">
            <div class="status-indicator"></div>
            <span class="status-text"></span>
          </div>
        </div>
      </div>
    `;
  }
  
  connectedCallback() {
    const card = this.shadowRoot.querySelector('.plant-card');
    const image = this.shadowRoot.querySelector('.plant-image');
    const name = this.shadowRoot.querySelector('.plant-name');
    const indicator = this.shadowRoot.querySelector('.status-indicator');
    const statusText = this.shadowRoot.querySelector('.status-text');
    
    // 设置数据
    name.textContent = this.getAttribute('name') || '未命名植物';
    image.style.backgroundImage = `url(${this.getAttribute('image') || 'assets/default-plant.png'})`;
    
    // 设置状态指示器
    const status = this.getAttribute('status') || 'healthy';
    switch(status) {
      case 'healthy':
        indicator.style.backgroundColor = '#5DB075';
        statusText.textContent = '健康';
        break;
      case 'warning':
        indicator.style.backgroundColor = '#FFC107';
        statusText.textContent = '需要关注';
        break;
      case 'danger':
        indicator.style.backgroundColor = '#FF6B6B';
        statusText.textContent = '急需护理';
        break;
    }
    
    // 添加点击事件
    card.addEventListener('click', () => {
      const event = new CustomEvent('cardClick', {
        bubbles: true,
        composed: true,
        detail: { 
          id: this.getAttribute('id'),
          name: this.getAttribute('name')
        }
      });
      this.dispatchEvent(event);
    });
  }
}

// 浮动按钮组件
class FloatingActionButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #5DB075;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
          z-index: 1000;
        }
        .fab:active {
          transform: scale(0.9);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .fab-icon {
          color: white;
          font-size: 24px;
          user-select: none;
        }
      </style>
      
      <div class="fab">
        <span class="fab-icon">+</span>
      </div>
    `;
  }
  
  connectedCallback() {
    const fab = this.shadowRoot.querySelector('.fab');
    
    fab.addEventListener('click', () => {
      const event = new CustomEvent('fabClick', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }
}

// 定义自定义元素
customElements.define('plant-card', PlantCard);
customElements.define('floating-action-button', FloatingActionButton);