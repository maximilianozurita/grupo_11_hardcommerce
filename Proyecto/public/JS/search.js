const API_SEARCH_URL = 'http://localhost:3000/api/products/search?name='

window.addEventListener('load', () => {
    const search = document.querySelector('.searchMenu')
    const inputSearch = document.querySelector('.searchMenu input')
    const searchForm = document.querySelector('.searchMenu')
    const searchRecent = document.querySelector('.searchMenu .results .recent')
    const searchRecentContainer = document.querySelector('.searchMenu .results .recent .list')
    const containerResults = document.querySelector('.searchMenu .results')
    const containerResultsList = document.querySelector('.searchMenu .results .list-results')

    // cuando el input está en foco
    inputSearch.addEventListener('focus', () => {
        searchForm.classList.add('focused')
        containerResults.style.display = 'block'
        searchRecent.style.display = 'block'

        // poner en componente ultima busqueda
        searchRecentContainer.innerHTML = localStorage.getItem('recent_search') || '-'

    })

    // cuando tapea enter agregamos en localStorage lo buscado
    inputSearch.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            searchForm.classList.remove('focused')
            containerResults.style.display = 'none'
            searchRecent.style.display = 'none'
            containerResultsList.style.display = 'none'
            inputSearch.value = ''
        } else {
            doSearch()
        }
    })

    // generar busqueda
    function doSearch() {
        const value = inputSearch.value
        containerResultsList.style.display = 'block'
        containerResultsList.innerHTML = 'cargando...'

        localStorage.setItem('recent_search', value)

        // poner en componente ultima busqueda
        searchRecentContainer.innerHTML = value

        fetch(`${API_SEARCH_URL}${value}`)
            .then(res => res.json())
            .then(res => {
                containerResultsList.innerHTML = ''

                if (res.meta.total === 0) {
                    containerResultsList.innerHTML = 'No se encontro producto'
                } else {
                    console.log(res.data.Products[0])
                    res.data.Products.forEach(product => {
                        containerResultsList.innerHTML += `<a href='/products/detail/${product.id}'>${product.name}</a>`
                    })

                }
            })
    }

    // detecta click afuera
    window.addEventListener('click', (e) => {
        const clickOutside = e.composedPath().includes(search)
        if (!clickOutside) {
            searchForm.classList.remove('focused')
            containerResults.style.display = 'none'
            searchRecent.style.display = 'none'
            containerResultsList.style.display = 'none'
            inputSearch.value = ''
        }
    })
})
