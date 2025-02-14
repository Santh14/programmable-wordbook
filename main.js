function showPage(pageId) {
    // 모든 페이지와 탭을 비활성화합니다.
    var pages = document.querySelectorAll('.page');
    var tabs = document.querySelectorAll('.tab');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    // 선택된 페이지와 탭을 활성화합니다.
    document.getElementById(pageId).classList.add('active');
    document.querySelector('.tab[onclick="showPage(\'' + pageId + '\')"]').classList.add('active');
}


