const init = () => {
  renderStart()
  renderAchievements()
  initNightDaySlider()
  document.addEventListener('aos:in:slider', ({ detail }) => {
    detail.style.animation = 'scaleY 2000ms'
  })
}

const renderStart = () => {
  const target = document.querySelector('#stars')
  const positions = [
    { star: [-20, -60, 30] },
    { star: [-40, 40, 20] },
    { star: [-20, 80, 10] },
    { star: [20, -50, 20] }
  ]

  for (let i = 0; i < positions.length; i++) {
    const element = document.createElement('img')
    element.src = './assets/img/icons/star.svg'
    element.classList.add('star')
    element.classList.add('nodrag')
    element.setAttribute('data-aos', 'zoom-in')
    element.style.top = positions[i].star[0] + 'px'
    element.style.left = positions[i].star[1] + 'px'
    element.style.height = positions[i].star[2] + 'px'
    target.appendChild(element)
  }
}

const renderAchievements = () => {
  const target = document.querySelector('#achievements')
  for (let i = 1; i < 6; i++) {
    const element = document.createElement('img')
    element.src = './assets/img/icons/achievements/' + i + '.svg'
    element.classList.add('achievement')
    const pos = i * 30 - 90
    const down = Math.abs(i - 3) * -20 + 20
    element.style.transform = 'translate(' + pos + 'px, ' + down + 'px)'
    target.appendChild(element)
  }
}

const toggleHeader = () => {
  const header = document.querySelector('header')
  const height = header.getBoundingClientRect().height
  if (height <= 36) {
    header.style.height = header.childElementCount * height + 'px'
  } else {
    header.style.height = '35px'
  }
}

const initNightDaySlider = () => {
  screenElements = document.querySelectorAll('.screen-slider')
  screenElements.forEach(screenElement => {
    const handleElement = screenElement.childNodes[1].childNodes[1]
    let canMove = false
    const moving = (bool) => {
      canMove = bool
      if (bool) {
        handleElement.style.backgroundColor = '#EF3155'
      } else {
        handleElement.style.backgroundColor = '#fff'
      }
    }

    screenElement.addEventListener('mousemove', (e) => {
      if (canMove) {
        const rect = e.currentTarget.getBoundingClientRect(),
        offsetX = e.clientX - rect.left
        moveNightDaySlider(screenElement, offsetX)
      }
    })
    screenElement.addEventListener('mouseleave', () => { 
      moving(false)
    })
    screenElement.addEventListener('mouseup', () => { 
      moving(false)
    })
    handleElement.addEventListener('mousedown', () => { 
      moving(true)
    })
  })
}

const moveNightDaySlider = (screen, posInBox) => {
  const screenWidth = screen.scrollWidth
  const fill = posInBox / screenWidth * 100
  screen.childNodes[1].style.width = fill + '%'
}