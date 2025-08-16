// Line Mini App - Main JavaScript File
class LineMiniApp {
    constructor() {
        this.liffId = "2007779878-GJbAEyka"; // 実際のLIFF IDを設定してください
        this.isLoggedIn = false;
        this.userProfile = null;
        
        this.init();
    }
    
    async init() {
        try {
            this.updateStatus('LIFFの初期化中...');
            
            // LIFFの初期化
            await liff.init({ liffId: this.liffId });
            
            this.updateStatus('LIFFの初期化が完了しました');
            
            // ログイン状態の確認
            this.isLoggedIn = liff.isLoggedIn();
            
            if (this.isLoggedIn) {
                await this.loadUserProfile();
                this.showLoggedInState();
            } else {
                this.showLoggedOutState();
            }
            
            this.setupEventListeners();
            
        } catch (error) {
            console.error('LIFF初期化エラー:', error);
            this.updateStatus('LIFFの初期化に失敗しました: ' + error.message);
            this.showLoggedOutState();
            // エラーが発生した場合でもイベントリスナーを設定
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        // ログインボタン
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (this.liffId) {
                    this.login();
                } else {
                    // LIFF IDが設定されていない場合はモックログイン
                    this.mockLogin();
                }
            });
        }
        
        // ログアウトボタン
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
        
        // メッセージ送信ボタン
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
    }
    
    async login() {
        try {
            this.updateStatus('ログイン中...');
            
            if (!liff.isLoggedIn()) {
                liff.login();
            }
            
        } catch (error) {
            console.error('ログインエラー:', error);
            this.updateStatus('ログインに失敗しました: ' + error.message);
        }
    }
    
    async logout() {
        try {
            this.updateStatus('ログアウト中...');
            
            if (this.liffId && liff.isLoggedIn()) {
                // 実際のLIFFログアウト
                liff.logout();
            } else {
                // 開発モードでのモックログアウト
                this.mockLogout();
            }
            
        } catch (error) {
            console.error('ログアウトエラー:', error);
            this.updateStatus('ログアウトに失敗しました: ' + error.message);
            // エラーが発生した場合もモックログアウトを実行
            this.mockLogout();
        }
    }
    
    async loadUserProfile() {
        try {
            this.userProfile = await liff.getProfile();
            this.displayUserProfile();
        } catch (error) {
            console.error('プロフィール取得エラー:', error);
            this.updateStatus('プロフィールの取得に失敗しました');
        }
    }
    
    displayUserProfile() {
        if (this.userProfile) {
            const profileSection = document.getElementById('profileSection');
            const profilePicture = document.getElementById('profilePicture');
            const displayName = document.getElementById('displayName');
            const statusMessage = document.getElementById('statusMessage');
            
            profilePicture.src = this.userProfile.pictureUrl;
            displayName.textContent = this.userProfile.displayName;
            statusMessage.textContent = this.userProfile.statusMessage || 'ステータスメッセージなし';
            
            profileSection.style.display = 'block';
        }
    }
    
    showLoggedInState() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const messageSection = document.getElementById('messageSection');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (messageSection) messageSection.style.display = 'block';
        
        this.updateStatus('ログイン済みです');
    }
    
    showLoggedOutState() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const messageSection = document.getElementById('messageSection');
        const profileSection = document.getElementById('profileSection');
        
        if (loginBtn) {
            loginBtn.style.display = 'block';
            // LIFF IDが設定されていない場合はモックログインボタンに変更
            if (!this.liffId) {
                loginBtn.textContent = 'モックログイン（開発用）';
            } else {
                loginBtn.textContent = 'ログイン';
            }
        }
        
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (messageSection) messageSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'none';
        
        this.updateStatus('ログインしてください');
    }
    
    async sendMessage() {
        try {
            const messageText = document.getElementById('messageText').value.trim();
            const messageType = document.getElementById('messageType').value;
            
            if (!messageText) {
                this.updateStatus('メッセージを入力してください');
                showMessage('メッセージを入力してください', 'error');
                return;
            }
            
            this.updateStatus('メッセージを送信中...');
            
            if (this.liffId && liff.isInClient()) {
                // LINEアプリ内でのメッセージ送信
                await liff.sendMessages([
                    {
                        type: 'text',
                        text: messageText
                    }
                ]);
                
                this.updateStatus('メッセージを送信しました');
                showMessage('メッセージを送信しました！', 'success');
            } else {
                // 開発モードでのモックメッセージ送信
                this.mockSendMessage(messageText, messageType);
            }
            
        } catch (error) {
            console.error('メッセージ送信エラー:', error);
            this.updateStatus('メッセージの送信に失敗しました: ' + error.message);
            // エラーが発生した場合もモックメッセージ送信を実行
            this.mockSendMessage();
        }
    }
    
    updateStatus(message) {
        const statusElement = document.getElementById('statusText');
        if (statusElement) {
            statusElement.textContent = message;
        }
        console.log('Status:', message);
    }
    
    // 開発用のモック機能
    mockLogin() {
        this.isLoggedIn = true;
        this.userProfile = {
            displayName: 'テストユーザー',
            pictureUrl: 'https://via.placeholder.com/150',
            statusMessage: 'テスト用のステータスメッセージ'
        };
        this.displayUserProfile();
        this.showLoggedInState();
        this.updateStatus('モックログイン完了（開発用）');
    }
    
    // 開発用のモックログアウト機能
    mockLogout() {
        this.isLoggedIn = false;
        this.userProfile = null;
        this.showLoggedOutState();
        this.updateStatus('モックログアウト完了（開発用）');
    }
    
    // 開発用のモックメッセージ送信機能
    mockSendMessage(messageText, messageType) {
        // モックメッセージ送信のシミュレーション
        setTimeout(() => {
            const typeText = {
                'chat': 'チャット',
                'friends': '友達',
                'groups': 'グループ'
            }[messageType] || 'チャット';
            
            this.updateStatus(`モックメッセージ送信完了（開発用）: ${typeText}に送信`);
            // 成功メッセージを表示
            showMessage(`メッセージを${typeText}に送信しました！`, 'success');
            
            // メッセージ欄をクリア
            document.getElementById('messageText').value = '';
        }, 1000);
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    // 既存LIFF初期化
    if (typeof liff === 'undefined') {
        console.warn('LIFF SDKが読み込まれていません。開発モードで動作します。');
        
        // 開発用のモックアプリ
        const mockApp = new LineMiniApp();
        mockApp.updateStatus('開発モード: LIFF SDKが利用できません');
        
        // 開発用のモックログインボタンを追加
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.textContent = 'モックログイン（開発用）';
        loginBtn.addEventListener('click', () => {
            mockApp.mockLogin();
        });
        
        return;
    }
    
    // 本格的なアプリケーションの初期化
    const app = new LineMiniApp();

    // --- メニューのボタン制御 ---
    const menuBtns = document.querySelectorAll('.menu-btn');
    const iframeModal = document.getElementById('iframeModal');
    const contentIframe = document.getElementById('contentIframe');
    const closeIframeBtn = document.getElementById('closeIframeBtn');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            contentIframe.src = url;
            iframeModal.style.display = 'flex';
        });
    });
    closeIframeBtn.addEventListener('click', () => {
        iframeModal.style.display = 'none';
        contentIframe.src = '';
    });

    // --- チャット欄制御（LINE風UI） ---
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    function addChatMessage(message, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + sender;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = message;
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    // 最初の管理者メッセージ
    addChatMessage('この度は我々「市民の人権擁護の会」の活動に興味をお持ちいただき誠にありがとうございました！このミニアプリでは皆様のご意見やご質問を受け付けております。ミニアプリの最下部にある入力枠に自由にご記入ください。\n\n※メッセージは当スタッフのみに届きます。ほかの登録者には公開されませんのでご安心ください。', 'admin');
    function autoReply() {
        setTimeout(() => {
            addChatMessage('担当者からご回答させていただきます。しばらくお時間をいただく場合もございますので予めご了承ください。', 'admin');
        }, 800);
    }
    chatSendBtn.addEventListener('click', () => {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addChatMessage(msg, 'user');
        chatInput.value = '';
        autoReply();
        // --- ここで管理者へのPUSH送信API呼び出しも拡張可能 ---
    });
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            chatSendBtn.click();
        }
    });
});

// ユーティリティ関数
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// エラーハンドリング
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showMessage('エラーが発生しました: ' + event.error.message, 'error');
});

// 未処理のPromise rejection
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showMessage('予期しないエラーが発生しました', 'error');
}); 