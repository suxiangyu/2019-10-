var btn = document.getElementById('btn');
btn.onclick = function () {
    var h1 = document.getElementsByTagName('h1')[0];
    h1.style.background = 'gold';

    fetch('http://localhost:8080/add?type=pro', {
        method: 'post',
        credentials: "include",
        body: JSON.stringify({ d: [100, 200, 300] })
    }).then(data => data.json()).then(data => {
        console.log(data);
    })

    $.post('http://localhost:8080/add?type=pro', {
        a: 123,
        b: 234,
        c: 345
    })
    $.post('http://localhost:8080/add?type=pro', {
        a1: 123,
        b1: 234,
        c1: 345
    })
    $.post('http://localhost:8080/add?type=pro', {
        a2: 123,
        b2: 234,
        c2: 345
    })

}

btn2.onclick = function () {
    fetch('http://localhost:8080/list?type=cookie', {
        method: 'get'
    }).then(data => data.json()).then(data => {
        console.log(data);
    })
}