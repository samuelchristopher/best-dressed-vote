console.log('from index js')

window.addEventListener('load', (event) => {
    console.log('ready for js yo!')
    let loadingState = document.body.querySelector('.loading')
    loadingState.classList.add('hide-loading')
})