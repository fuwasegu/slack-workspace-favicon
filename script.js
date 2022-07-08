if (document.getElementById('changed-icon') == null) {
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
    const url = backgroundImageUrls[0];

    // クリックし直してモーダルを閉じる
    btn.click();

    //ファビコンを上書きする
    const icon = document.querySelector('link[rel*="shortcut icon"]');
    icon.href = url;
    icon.id = 'changed-icon';

    /** ここから下は，Slack が通知を受け取りファビコンが書き換えられることを監視してさらに上書きする */
    const head = document.head
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (document.getElementById('changed-icon') == null) {
                 //ファビコンを上書きする
                const icon = document.querySelector('link[rel*="shortcut icon"]');
                icon.href = url;
                icon.id = 'changed-icon';
            }
        });
    });

    const config = {
        characterData: true,
        childList: true, // 子ノードの変化を監視
        subtree: true // 子孫ノードも監視対象に含める
    };

    observer.observe(head, config);
}
