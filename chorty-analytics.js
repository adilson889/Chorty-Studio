// ============================================================================
// CHORTY ANALYTICS SYSTEM v2.0 - PROFESSIONAL EDITION
// Sistema completo de analytics para qualquer versão do Chorty
// ============================================================================

(function() {
    'use strict';
    
    // ============================================================================
    // CONFIGURAÇÃO DO SISTEMA
    // ============================================================================
    const CONFIG = {
        // 1. WEBHOOK DO DISCORD (obrigatório para alertas)
        DISCORD_WEBHOOK: 'https://discord.com/api/webhooks/1450417356592644220/ydcMhon0A02Udk_n5_yHTiXFLAH7DoUpM7HXfnEs9IW1o9LjQE51KlDkfiUhsFP1xHkx',
        
        // 2. SENHA ADMIN 
        ADMIN_PASSWORD: 'Ch0rty2024!Secure',
        
        // 3. COLETA DE DADOS (ativar/desativar módulos)
        DATA_COLLECTION: {
            user_behavior: true,      // Cliques, rolagem, tempo na página
            technical_data: true,     // Navegador, sistema, conexão
            performance: true,        // Tempo de carregamento, memória
            engagement: true,         // Interação com elementos
            errors: true              // JavaScript errors
        },
        
        // 4. TEMPO ENTRE COLETAS (milissegundos)
        COLLECTION_INTERVALS: {
            activity: 30000,          // Atividade a cada 30s
            performance: 60000,       // Performance a cada 1min
            heartbeat: 15000          // Heartbeat a cada 15s
        },
        
        // 5. EVENTOS QUE DISPARAM ALERTAS NO DISCORD
        ALERT_EVENTS: ['export', 'upgrade', 'email_capture', 'high_value_action'],
        
        // 6. COOLDOWN ENTRE ALERTAS (minutos)
        ALERT_COOLDOWN: 10,
        
        // 7. LIMITES DE ARMAZENAMENTO
        STORAGE_LIMITS: {
            max_events: 5000,
            max_sessions: 100,
            max_errors: 200
        }
    };
    
    // ============================================================================
    // VARIÁVEIS GLOBAIS E ESTADO
    // ============================================================================
    let systemInitialized = false;
    let currentSession = null;
    let userProfile = null;
    let activityMonitor = null;
    let lastAlertTimestamp = 0;
    const dataBuffer = new Map();
    
    // ============================================================================
    // CLASSES DO SISTEMA
    // ============================================================================
    
    class UserSession {
        constructor() {
            this.id = this.generateSessionId();
            this.startTime = Date.now();
            this.lastActivity = Date.now();
            this.pageViews = 1;
            this.events = [];
            this.engagementScore = 0;
            this.technicalProfile = this.collectTechnicalData();
            this.initializeTracking();
        }
        
        generateSessionId() {
            const timestamp = Date.now().toString(36);
            const random = Math.random().toString(36).substring(2, 10);
            return `sess_${timestamp}_${random}`;
        }
        
        collectTechnicalData() {
            return {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screen: {
                    width: screen.width,
                    height: screen.height,
                    colorDepth: screen.colorDepth,
                    pixelRatio: window.devicePixelRatio
                },
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                connection: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt
                } : null,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                cookies: navigator.cookieEnabled,
                javaScript: true,
                localStorage: this.testLocalStorage(),
                sessionStorage: this.testSessionStorage()
            };
        }
        
        testLocalStorage() {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        }
        
        testSessionStorage() {
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        }
        
        initializeTracking() {
            // Heartbeat para verificar sessão ativa
            this.heartbeatInterval = setInterval(() => {
                this.recordActivity('heartbeat', {
                    timestamp: Date.now(),
                    timeOnPage: Date.now() - this.lastActivity,
                    engagement: this.engagementScore
                });
            }, CONFIG.COLLECTION_INTERVALS.heartbeat);
            
            // Monitorar performance
            if (CONFIG.DATA_COLLECTION.performance) {
                this.performanceInterval = setInterval(() => {
                    this.recordPerformance();
                }, CONFIG.COLLECTION_INTERVALS.performance);
            }
        }
        
        recordActivity(type, data = {}) {
            const activity = {
                id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                type: type,
                session: this.id,
                timestamp: Date.now(),
                time: new Date().toISOString(),
                data: data
            };
            
            this.events.push(activity);
            this.lastActivity = Date.now();
            
            // Aumentar pontuação de engajamento
            if (type === 'click' || type === 'scroll' || type === 'input') {
                this.engagementScore += 1;
            }
            
            // Salvar no buffer global
            dataBuffer.set(activity.id, activity);
            
            return activity;
        }
        
        recordPerformance() {
            if (!window.performance || !window.performance.memory) return;
            
            const perfData = {
                memory: {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                },
                timing: performance.timing ? {
                    domLoading: performance.timing.domLoading,
                    domInteractive: performance.timing.domInteractive,
                    domContentLoaded: performance.timing.domContentLoadedEventEnd,
                    load: performance.timing.loadEventEnd
                } : null,
                navigation: performance.navigation ? {
                    type: performance.navigation.type,
                    redirectCount: performance.navigation.redirectCount
                } : null
            };
            
            this.recordActivity('performance', perfData);
        }
        
        endSession() {
            if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
            if (this.performanceInterval) clearInterval(this.performanceInterval);
            
            const sessionData = {
                sessionId: this.id,
                startTime: this.startTime,
                endTime: Date.now(),
                duration: Date.now() - this.startTime,
                pageViews: this.pageViews,
                totalEvents: this.events.length,
                engagementScore: this.engagementScore,
                technicalProfile: this.technicalProfile
            };
            
            this.saveToStorage(sessionData);
            return sessionData;
        }
        
        saveToStorage(data) {
            try {
                const sessions = JSON.parse(localStorage.getItem('ch_sessions') || '[]');
                sessions.push(data);
                
                // Manter limite de sessões
                if (sessions.length > CONFIG.STORAGE_LIMITS.max_sessions) {
                    sessions.splice(0, sessions.length - CONFIG.STORAGE_LIMITS.max_sessions);
                }
                
                localStorage.setItem('ch_sessions', JSON.stringify(sessions));
                
                // Salvar eventos individualmente
                this.events.forEach(event => {
                    const events = JSON.parse(localStorage.getItem('ch_events') || '[]');
                    events.push(event);
                    
                    if (events.length > CONFIG.STORAGE_LIMITS.max_events) {
                        events.splice(0, events.length - CONFIG.STORAGE_LIMITS.max_events);
                    }
                    
                    localStorage.setItem('ch_events', JSON.stringify(events));
                });
            } catch (error) {
                console.warn('Chorty Analytics: Erro ao salvar dados', error);
            }
        }
    }
    
    // ============================================================================
    // SISTEMA DE MONITORAMENTO
    // ============================================================================
    
    class ActivityMonitor {
        constructor(session) {
            this.session = session;
            this.mouseMovements = [];
            this.clicks = [];
            this.scrollDepth = 0;
            this.keyStrokes = 0;
            this.initializeEventListeners();
        }
        
        initializeEventListeners() {
            // Movimentos do mouse
            document.addEventListener('mousemove', (e) => {
                this.trackMouseMovement(e);
            });
            
            // Cliques
            document.addEventListener('click', (e) => {
                this.trackClick(e);
            });
            
            // Rolagem
            document.addEventListener('scroll', () => {
                this.trackScroll();
            });
            
            // Teclas pressionadas
            document.addEventListener('keydown', (e) => {
                this.trackKeyPress(e);
            });
            
            // Foco e perda de foco
            window.addEventListener('focus', () => {
                this.session.recordActivity('window_focus');
            });
            
            window.addEventListener('blur', () => {
                this.session.recordActivity('window_blur');
            });
            
            // Redimensionamento da janela
            window.addEventListener('resize', () => {
                this.session.recordActivity('window_resize', {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            });
            
            // Visibilidade da página
            document.addEventListener('visibilitychange', () => {
                this.session.recordActivity('visibility_change', {
                    state: document.visibilityState
                });
            });
        }
        
        trackMouseMovement(event) {
            const movement = {
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now(),
                target: event.target.tagName
            };
            
            this.mouseMovements.push(movement);
            
            // Limitar tamanho do array
            if (this.mouseMovements.length > 1000) {
                this.mouseMovements.shift();
            }
            
            // Agregar movimentos a cada 30 segundos
            if (Date.now() % 30000 < 16) { // Aproximadamente a cada 30s
                const aggregated = {
                    totalMovements: this.mouseMovements.length,
                    avgSpeed: this.calculateMouseSpeed(),
                    heatmap: this.generateHeatmapData()
                };
                
                this.session.recordActivity('mouse_aggregated', aggregated);
            }
        }
        
        trackClick(event) {
            const element = event.target;
            const clickData = {
                x: event.clientX,
                y: event.clientY,
                target: {
                    tag: element.tagName,
                    id: element.id,
                    className: element.className,
                    text: element.textContent.substring(0, 100)
                },
                timestamp: Date.now()
            };
            
            this.clicks.push(clickData);
            this.session.recordActivity('click', clickData);
            
            // Verificar se é um botão importante
            if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
                const buttonText = element.textContent.trim().toLowerCase();
                if (buttonText.includes('export') || buttonText.includes('download')) {
                    this.triggerAlert('export', { element: clickData.target });
                }
                if (buttonText.includes('upgrade') || buttonText.includes('pro') || buttonText.includes('premium')) {
                    this.triggerAlert('upgrade', { element: clickData.target });
                }
            }
        }
        
        trackScroll() {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > this.scrollDepth) {
                this.scrollDepth = scrollPercent;
                this.session.recordActivity('scroll_depth', {
                    percentage: Math.round(scrollPercent),
                    position: window.scrollY
                });
            }
        }
        
        trackKeyPress(event) {
            this.keyStrokes++;
            
            // Agregar teclas pressionadas a cada minuto
            if (Date.now() % 60000 < 16) {
                this.session.recordActivity('keyboard_aggregated', {
                    totalStrokes: this.keyStrokes,
                    timestamp: Date.now()
                });
                this.keyStrokes = 0;
            }
        }
        
        calculateMouseSpeed() {
            if (this.mouseMovements.length < 2) return 0;
            
            let totalDistance = 0;
            for (let i = 1; i < this.mouseMovements.length; i++) {
                const dx = this.mouseMovements[i].x - this.mouseMovements[i-1].x;
                const dy = this.mouseMovements[i].y - this.mouseMovements[i-1].y;
                totalDistance += Math.sqrt(dx * dx + dy * dy);
            }
            
            return totalDistance / this.mouseMovements.length;
        }
        
        generateHeatmapData() {
            // Agrupar coordenadas do mouse
            const zones = {
                top_left: 0,
                top_right: 0,
                bottom_left: 0,
                bottom_right: 0,
                center: 0
            };
            
            this.mouseMovements.forEach(move => {
                const x = move.x / window.innerWidth;
                const y = move.y / window.innerHeight;
                
                if (x < 0.33 && y < 0.33) zones.top_left++;
                else if (x > 0.66 && y < 0.33) zones.top_right++;
                else if (x < 0.33 && y > 0.66) zones.bottom_left++;
                else if (x > 0.66 && y > 0.66) zones.bottom_right++;
                else zones.center++;
            });
            
            return zones;
        }
        
        triggerAlert(eventType, data) {
            const now = Date.now();
            const cooldown = CONFIG.ALERT_COOLDOWN * 60 * 1000;
            
            if (CONFIG.ALERT_EVENTS.includes(eventType) && (now - lastAlertTimestamp) > cooldown) {
                lastAlertTimestamp = now;
                sendDiscordAlert(eventType, {
                    ...data,
                    session: this.session.id,
                    timestamp: new Date().toISOString()
                });
            }
        }
    }
    
    // ============================================================================
    // FUNÇÕES UTILITÁRIAS
    // ============================================================================
    
    function sendDiscordAlert(eventType, data) {
        if (!CONFIG.DISCORD_WEBHOOK || CONFIG.DISCORD_WEBHOOK.includes('SEU_ID')) {
            return;
        }
        
        const embed = {
            title: getAlertTitle(eventType),
            description: getAlertDescription(eventType, data),
            color: getAlertColor(eventType),
            fields: getAlertFields(data),
            timestamp: new Date().toISOString(),
            footer: {
                text: `Chorty Analytics • Session: ${data.session.substring(0, 12)}...`
            }
        };
        
        fetch(CONFIG.DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'Chorty Analytics',
                embeds: [embed]
            })
        }).catch(() => {
            // Falha silenciosa
        });
    }
    
    function getAlertTitle(eventType) {
        const titles = {
            'export': 'Export Action Detected',
            'upgrade': 'Upgrade Intent Detected',
            'email_capture': 'Email Captured',
            'high_value_action': 'High Value User Action',
            'error': 'System Error Detected'
        };
        return titles[eventType] || 'User Activity Alert';
    }
    
    function getAlertDescription(eventType, data) {
        const descriptions = {
            'export': `User exported content with ${data.element?.text || 'unknown element'}`,
            'upgrade': `User showed interest in upgrading plan`,
            'email_capture': `New email captured from domain: ${data.domain || 'unknown'}`,
            'high_value_action': `User performed high-value action: ${data.action || 'unknown'}`
        };
        return descriptions[eventType] || 'User performed significant action';
    }
    
    function getAlertColor(eventType) {
        const colors = {
            'export': 0x3498db,    // Blue
            'upgrade': 0xf39c12,   // Orange
            'email_capture': 0x9b59b6, // Purple
            'high_value_action': 0x2ecc71, // Green
            'error': 0xe74c3c      // Red
        };
        return colors[eventType] || 0x95a5a6; // Gray
    }
    
    function getAlertFields(data) {
        const fields = [];
        
        if (data.element) {
            fields.push({
                name: 'Target Element',
                value: `${data.element.tag}${data.element.id ? ' #' + data.element.id : ''}${data.element.className ? ' .' + data.element.className : ''}`,
                inline: true
            });
        }
        
        if (data.domain) {
            fields.push({
                name: 'Email Domain',
                value: data.domain,
                inline: true
            });
        }
        
        fields.push({
            name: 'Timestamp',
            value: new Date().toLocaleTimeString('pt-BR'),
            inline: true
        });
        
        return fields;
    }
    
    function createAdminInterface() {
        const adminBtn = document.createElement('div');
        adminBtn.id = 'chorty-admin-access';
        adminBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        `;
        
        adminBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10000;
            opacity: 0.3;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        adminBtn.addEventListener('mouseenter', () => {
            adminBtn.style.opacity = '1';
            adminBtn.style.transform = 'scale(1.1)';
            adminBtn.style.background = '#2a2a2a';
        });
        
        adminBtn.addEventListener('mouseleave', () => {
            adminBtn.style.opacity = '0.3';
            adminBtn.style.transform = 'scale(1)';
            adminBtn.style.background = '#1a1a1a';
        });
        
        adminBtn.addEventListener('click', showAdminPanel);
        
        setTimeout(() => {
            document.body.appendChild(adminBtn);
        }, 10000);
    }
    
    function showAdminPanel() {
        const password = prompt('Admin Access Required\n\nEnter password:');
        if (password !== CONFIG.ADMIN_PASSWORD) {
            alert('Access denied. Invalid password.');
            return;
        }
        
        const analyticsData = getAnalyticsData();
        const stats = calculateStatistics(analyticsData);
        
        const panel = document.createElement('div');
        panel.id = 'chorty-admin-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 1200px;
            height: 85vh;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            z-index: 10001;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        panel.innerHTML = `
            <div style="display: flex; height: 100%;">
                <!-- Sidebar -->
                <div style="width: 240px; background: #1e293b; border-right: 1px solid #334155; padding: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px;">
                        <div style="width: 32px; height: 32px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #f1f5f9;">Chorty Analytics</div>
                            <div style="font-size: 12px; color: #94a3b8;">Professional Edition</div>
                        </div>
                    </div>
                    
                    <nav style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="nav-btn active" data-view="overview" style="text-align: left; padding: 10px 12px; background: #334155; color: #f1f5f9; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            Overview
                        </button>
                        
                        <button class="nav-btn" data-view="sessions" style="text-align: left; padding: 10px 12px; background: transparent; color: #94a3b8; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Sessions
                        </button>
                        
                        <button class="nav-btn" data-view="events" style="text-align: left; padding: 10px 12px; background: transparent; color: #94a3b8; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                            Events
                        </button>
                        
                        <button class="nav-btn" data-view="performance" style="text-align: left; padding: 10px 12px; background: transparent; color: #94a3b8; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                            </svg>
                            Performance
                        </button>
                    </nav>
                    
                    <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid #334155;">
                        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 10px;">System Status</div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></div>
                            <div style="font-size: 13px; color: #cbd5e1;">Active Session</div>
                        </div>
                        <div style="font-size: 11px; color: #94a3b8;">${currentSession.id.substring(0, 15)}...</div>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div style="flex: 1; padding: 20px; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h2 style="margin: 0; color: #f1f5f9; font-size: 24px;">Analytics Dashboard</h2>
                        <div style="display: flex; gap: 10px;">
                            <button id="export-data" style="padding: 8px 16px; background: #334155; color: #cbd5e1; border: 1px solid #475569; border-radius: 6px; cursor: pointer; font-size: 13px;">
                                Export Data
                            </button>
                            <button id="refresh-data" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px;">
                                Refresh
                            </button>
                            <button id="close-panel" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px;">
                                Close
                            </button>
                        </div>
                    </div>
                    
                    <!-- Stats Cards -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
                        <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Total Sessions</div>
                            <div style="font-size: 32px; font-weight: 600; color: #f1f5f9;">${stats.totalSessions}</div>
                        </div>
                        
                        <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Today's Events</div>
                            <div style="font-size: 32px; font-weight: 600; color: #10b981;">${stats.todayEvents}</div>
                        </div>
                        
                        <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Avg Session</div>
                            <div style="font-size: 32px; font-weight: 600; color: #3b82f6;">${Math.round(stats.avgSessionDuration / 60000)}m</div>
                        </div>
                        
                        <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">Engagement</div>
                            <div style="font-size: 32px; font-weight: 600; color: #f59e0b;">${stats.avgEngagementScore}</div>
                        </div>
                    </div>
                    
                    <!-- Recent Activity -->
                    <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #f1f5f9; font-size: 16px;">Recent Activity</h3>
                        <div style="max-height: 300px; overflow-y: auto;">
                            ${analyticsData.recentEvents.map(event => `
                                <div style="border-bottom: 1px solid #334155; padding: 12px 0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
                                            <span style="font-weight: 500; color: #cbd5e1;">${event.type.replace(/_/g, ' ')}</span>
                                        </div>
                                        <span style="font-size: 12px; color: #94a3b8;">${event.time}</span>
                                    </div>
                                    ${event.data && Object.keys(event.data).length > 0 ? `
                                        <div style="font-size: 12px; color: #94a3b8; background: #0f172a; padding: 6px 8px; border-radius: 4px; margin-top: 4px;">
                                            ${Object.entries(event.data).map(([k, v]) => 
                                                `${k}: ${typeof v === 'object' ? JSON.stringify(v).substring(0, 50) : v}`
                                            ).join(' | ')}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Technical Data -->
                    <div style="background: #1e293b; border-radius: 8px; padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #f1f5f9; font-size: 16px;">Technical Profile</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div>
                                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Browser</div>
                                <div style="font-size: 14px; color: #cbd5e1;">${currentSession.technicalProfile.userAgent.substring(0, 80)}...</div>
                            </div>
                            
                            <div>
                                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Screen</div>
                                <div style="font-size: 14px; color: #cbd5e1;">${currentSession.technicalProfile.screen.width}x${currentSession.technicalProfile.screen.height}</div>
                            </div>
                            
                            <div>
                                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Timezone</div>
                                <div style="font-size: 14px; color: #cbd5e1;">${currentSession.technicalProfile.timezone}</div>
                            </div>
                            
                            <div>
                                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 4px;">Connection</div>
                                <div style="font-size: 14px; color: #cbd5e1;">
                                    ${currentSession.technicalProfile.connection ? 
                                        `${currentSession.technicalProfile.connection.effectiveType} (${currentSession.technicalProfile.connection.downlink} Mbps)` : 
                                        'Unknown'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event listeners
        panel.querySelector('#close-panel').addEventListener('click', () => {
            panel.remove();
        });
        
        panel.querySelector('#refresh-data').addEventListener('click', () => {
            panel.remove();
            showAdminPanel();
        });
        
        panel.querySelector('#export-data').addEventListener('click', exportAnalyticsData);
        
        // Navigation
        panel.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                panel.querySelectorAll('.nav-btn').forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = '#94a3b8';
                });
                e.target.style.background = '#334155';
                e.target.style.color = '#f1f5f9';
                // Implement view switching here
            });
        });
        
        // Close on Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                panel.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    function getAnalyticsData() {
        try {
            const events = JSON.parse(localStorage.getItem('ch_events') || '[]');
            const sessions = JSON.parse(localStorage.getItem('ch_sessions') || '[]');
            
            return {
                events: events,
                sessions: sessions,
                recentEvents: events.slice(-20).reverse(),
                currentSession: currentSession
            };
        } catch (error) {
            return { events: [], sessions: [], recentEvents: [], currentSession: null };
        }
    }
    
    function calculateStatistics(data) {
        const today = new Date().toLocaleDateString('pt-BR');
        const todayEvents = data.events.filter(e => {
            const eventDate = new Date(e.timestamp).toLocaleDateString('pt-BR');
            return eventDate === today;
        });
        
        const sessionDurations = data.sessions.map(s => s.duration || 0);
        const avgSessionDuration = sessionDurations.length > 0 ? 
            sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length : 0;
        
        const engagementScores = data.sessions.map(s => s.engagementScore || 0);
        const avgEngagementScore = engagementScores.length > 0 ? 
            Math.round(engagementScores.reduce((a, b) => a + b, 0) / engagementScores.length) : 0;
        
        return {
            totalSessions: data.sessions.length,
            totalEvents: data.events.length,
            todayEvents: todayEvents.length,
            avgSessionDuration: avgSessionDuration,
            avgEngagementScore: avgEngagementScore
        };
    }
    
    function exportAnalyticsData() {
        const data = getAnalyticsData();
        const exportData = {
            exportDate: new Date().toISOString(),
            summary: calculateStatistics(data),
            sessions: data.sessions,
            recentEvents: data.events.slice(-100),
            config: CONFIG
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chorty-analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        alert('Analytics data exported successfully.');
    }
    
    // ============================================================================
    // INICIALIZAÇÃO DO SISTEMA
    // ============================================================================
    
    function initializeSystem() {
        if (systemInitialized) return;
        
        // Iniciar sessão
        currentSession = new UserSession();
        
        // Iniciar monitor de atividade
        if (CONFIG.DATA_COLLECTION.user_behavior) {
            activityMonitor = new ActivityMonitor(currentSession);
        }
        
        // Configurar encerramento da sessão
        window.addEventListener('beforeunload', () => {
            currentSession.endSession();
        });
        
        // Criar interface admin
        createAdminInterface();
        
        // Configurar tratamento de erros
        if (CONFIG.DATA_COLLECTION.errors) {
            window.addEventListener('error', (e) => {
                currentSession.recordActivity('error', {
                    message: e.message,
                    filename: e.filename,
                    lineno: e.lineno,
                    colno: e.colno,
                    error: e.error?.toString()
                });
                
                if (CONFIG.ALERT_EVENTS.includes('error')) {
                    sendDiscordAlert('error', {
                        message: e.message,
                        location: e.filename,
                        line: e.lineno
                    });
                }
            });
            
            // Capturar Promises não tratadas
            window.addEventListener('unhandledrejection', (e) => {
                currentSession.recordActivity('promise_error', {
                    reason: e.reason?.toString()
                });
            });
        }
        
        systemInitialized = true;
        
        // Log de inicialização
        console.log(`Chorty Analytics v2.0 initialized`);
        console.log(`Session ID: ${currentSession.id}`);
        console.log(`Data Collection: ${JSON.stringify(CONFIG.DATA_COLLECTION)}`);
    }
    
    // ============================================================================
    // API PÚBLICA
    // ============================================================================
    
    window.ChortyAnalytics = {
        // Métodos de tracking
        track: (eventName, data) => {
            if (!currentSession) initializeSystem();
            return currentSession.recordActivity(eventName, data);
        },
        
        trackExport: (data) => {
            const event = window.ChortyAnalytics.track('export', data);
            sendDiscordAlert('export', { ...data, eventId: event.id });
            return event;
        },
        
        trackUpgrade: (data) => {
            const event = window.ChortyAnalytics.track('upgrade', data);
            sendDiscordAlert('upgrade', { ...data, eventId: event.id });
            return event;
        },
        
        trackEmailCapture: (email) => {
            const domain = email.split('@')[1];
            const event = window.ChortyAnalytics.track('email_capture', {
                email_length: email.length,
                domain: domain,
                timestamp: new Date().toISOString()
            });
            sendDiscordAlert('email_capture', { domain: domain });
            return event;
        },
        
        // Métodos de dados
        getSessionData: () => {
            return currentSession ? {
                id: currentSession.id,
                startTime: currentSession.startTime,
                duration: Date.now() - currentSession.startTime,
                events: currentSession.events.length,
                engagement: currentSession.engagementScore
            } : null;
        },
        
        getAnalyticsData: getAnalyticsData,
        
        exportData: exportAnalyticsData,
        
        // Métodos de sistema
        showAdminPanel: showAdminPanel,
        
        endSession: () => {
            if (currentSession) {
                return currentSession.endSession();
            }
        },
        
        // Configuração
        config: CONFIG,
        
        // Status
        isInitialized: () => systemInitialized
    };
    
    // ============================================================================
    // INICIALIZAÇÃO AUTOMÁTICA
    // ============================================================================
    
    // Aguardar carregamento da página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        initializeSystem();
    }
    
})();
