class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element, options) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        this.currentItem = 0
        this.moveCallbacks = []
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.children = [].slice.call(this.element.children)
        this.children.forEach(child => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
        });
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.setStyle()
        this.setNavigation()
    }

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    setStyle() {
        let ratio = this.children.length / this.options.slidesVisible
        this.container.style.width = 100 * ratio + '%'
        let items = document.querySelectorAll('.carousel__item')
        items.forEach(item => {
            item.style.width = 100 / this.children.length + '%'
        });
    }

    setNavigation() {
        let nextButton = this.createDivWithClass('nextButton')
        nextButton.style.background = 'lightgrey url(./images/arrow-right.svg) no-repeat center'
        nextButton.style.backgroundSize = '20px'
        nextButton.style.width = '40px'
        nextButton.style.height = '40px'
        nextButton.style.borderRadius = '50%'
        nextButton.addEventListener('click', this.next.bind(this))

        
        let prevButton = this.createDivWithClass('prevButton')
        prevButton.style.background = 'lightgrey url(./images/arrow-left.svg) no-repeat center'
        prevButton.style.backgroundSize = '20px'
        prevButton.style.width = '40px'
        prevButton.style.height = '40px'
        prevButton.style.borderRadius = '50%'
        prevButton.addEventListener('click', this.prev.bind(this))

        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)

        this.moveCallbacks.push(index => {
            
            if (index === 0) {
                prevButton.style.display = 'none'
                nextButton.style.display = 'block'
            } else if (this.children.length - (index + 1) >= this.options.slidesVisible) {
                prevButton.style.display = 'block'
                nextButton.style.display = 'block'
            } else if (this.children.length - (index + 1) <= this.options.slidesVisible) {
                prevButton.style.display = 'block'
                nextButton.style.display = 'none'
            }
        })
        this.moveCallbacks.forEach(cb => cb(0))
    }

    goToItem(index, animation = true) {

        if (animation === false) {
            this.container.style.transition = 'none'
        }
        let translateX = index * (-100 / this.children.length)
        this.container.style.transform = 'translate3d(' + translateX + '%' + ', 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }
    
}


document.addEventListener('DOMContentLoaded', () => {
    new Carousel(document.querySelector('#partenaire-container'), {
        slidesToScroll : 2,
        slidesVisible : 5
    })
})