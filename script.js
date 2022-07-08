const favicon = {
    url: null,
    init: function() {
        // ファビコンのURLを取得する
        // サイドバーのワークスペース名ボタンを取得しクリックする
        const btn = document.getElementsByClassName('p-ia__sidebar_header__button')[0];
        btn.click();

        // ワークスペースのアイコンを取得
        const backgroundImageUrls = [];
        const elements = document.getElementsByClassName('p-classic_nav__team_menu__blurb__icon');
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const backgroundImage = (element.style && element.style.backgroundImage) || '';
            const url = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            backgroundImageUrls.push(url);
        }

        // icon url 確定
        this.url = backgroundImageUrls[0];

        // クリックし直してモーダルを閉じる
        btn.click();
    },
    update: function() {
        if (this.url === null) return;

        // ファビコンを上書きする
        const icon = document.querySelector('link[rel*="shortcut icon"]');
        icon.href = this.url;
        icon.id = 'changed-icon';
    }
}


/** Slack が通知を受け取りファビコンが書き換えられることを監視してさらに上書きする */
const icon_observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (document.getElementById('changed-icon') == null) {
             // ファビコンを上書きする
             favicon.update();
        }
    });
});

const head = document.head
const icon_observer_config = {
    characterData: true,
    subtree: true,
    childList: true, // 子ノードの変化を監視
    subtree: true // 子孫ノードも監視対象に含める
};

// icon_observer の有効化は、読み込み完了後に実行


/** タイトルの変更（読み込みの完了）を監視する */
const title_observer = new MutationObserver(() => {
    // ファビコンを上書きする
    favicon.init();
    favicon.update();

    // 通知時の監視を有効化
    icon_observer.observe(head, icon_observer_config);

    title_observer.disconnect(); // 1度だけ実行
});

const title = document.querySelector('title');
const title_observer_config = {
    childList: true
};

title_observer.observe(title, title_observer_config);
