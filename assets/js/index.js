console.log('from index js')

let script = (url) => {
    let s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.url = url
    let x = document.getElementsByTagName('head')[0]
    x.appendChild(s)
}

let indexPageUI = () => {
    let b = document.querySelector('.content')
    b.innerHTML = '<home-page></home-page>'
}

window.addEventListener('load', (event) => {
    script('./assets/js/pages/index.js')
    console.log('ready for js yo!')
    indexPageUI()
    let loadingState = document.body.querySelector('.loading')
    loadingState.classList.add('hide-loading')
})