const Counter = ({ text, count }) => (
    <div style={{
      borderStyle: "solid",
      display: "inline-flex",
      padding: "5px",
      color: "white"
    }}>
      {text}: {count}
    </div>
  )

const Timer = () => {
  const [hours, setHours] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    setInterval(() => {
      setSeconds((old) => old + 1)
    }, 1000)
  }, [])

  if (seconds === 60) {
    setMinutes((old) => old + 1)
    setSeconds(0)
  }
  if (minutes === 60) {
    setHours((old) => old + 1)
    setMinutes(0)
  }

  return (
    <div style={{
      marginLeft: '3%',
      borderStyle: "solid",
      display: "inline-flex",
      padding: "5px",
      fontSize: '25px',
      color: "white"
    }}>
      Tiempo: {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )

}

const Card = ({ image }) => (
    <div className='card'>
      <div className='card-front' style={{
        backgroundImage:`url(${image['url']})`
      }}></div>
      <div className='card-back' name={image['name']}></div>
    </div>
  )

const Board = ({order}) => (
    <div style={{
      padding: '50px',
      display: 'grid',
      gap: '2em',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      justifyItems: 'center'
    }}>
      <Card image={Images[order[0]]}/><Card image={Images[order[4]]}/><Card image={Images[order[8]]}/><Card image={Images[order[12]]}/>
      <Card image={Images[order[1]]}/><Card image={Images[order[5]]}/><Card image={Images[order[9]]}/><Card image={Images[order[13]]}/>
      <Card image={Images[order[2]]}/><Card image={Images[order[6]]}/><Card image={Images[order[10]]}/><Card image={Images[order[14]]}/>
      <Card image={Images[order[3]]}/><Card image={Images[order[7]]}/><Card image={Images[order[11]]}/><Card image={Images[order[15]]}/>
    </div>
  )

const App = () => {
  const [movements, setMovements] = React.useState(0)
  const [achievements, setAchievements] = React.useState(0)
  const [flippedCard, setFlippedCard] = React.useState('none')
  const [activeBoard, setActiveBoard] = React.useState(true)
  const [imageOrder, setImageOrder] = React.useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

  if(achievements === 8)
    setTimeout(() => {
      alert('Juego ganado')
      window.location='/'
    }, 800)       

  React.useEffect(()=>{
    const arr = []
    for(let i=0;i<16;i++){
      const randNum = Math.floor(Math.random()*imageOrder.length)
      arr.push(imageOrder.splice(randNum,1))
    }
    setImageOrder(arr)
  },[])

  const compareCards = (currentCard)=>{
    setActiveBoard(false)
    if(flippedCard.attributes['name'].value === currentCard.attributes['name'].value){
      setAchievements((old)=>old+1)
      setActiveBoard(true)
    }else{
      console.log('diferentes')
      setTimeout(() => {
        setActiveBoard(true)
        flippedCard.parentElement.style.transform = 'rotateY(0deg)'
        currentCard.parentElement.style.transform = 'rotateY(0deg)'
      }, 2000)      
    }
    setFlippedCard('none')
    setMovements((old)=>old+1)
  }

  const handleClick = (event) => {
    if(activeBoard){
      const parent = event.target.parentElement
      if(parent.className === 'card'){
        parent.style.transform = 'rotateY(180deg)'
        setFlippedCard(event.target)
        if(flippedCard != 'none')
          compareCards(event.target)
      }
    } 
  }

  return (
    <div style={{
      padding: "70px",
      boxSizing: "border-box",
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
    onClick={handleClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Counter text="Movimientos" count={movements}/>
        <Timer />
        <Counter text="Parejas encontradas" count={achievements}/>
      </div>
      <Board order={imageOrder}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const Images = [
  {url:'https://assets.bigcartel.com/product_images/240013415/HP+LOVECRAFT+-+By+Sam+Shearon+2017+-+Low+Resolution.jpg?auto=format&fit=max&w=780',
  name:'The Creator'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/dd7fdbc29f36348203837a6aacb8173b-500x657.jpg',
  name:'Dagon'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/Screenshot_20171020-125436-500x680.jpg',
  name:'Yog-Sothoth'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/img.png',
  name:'Nyarlathotep'},
  {url:'https://e0.pxfuel.com/wallpapers/392/688/desktop-wallpaper-cthulhu-sagas-mobile-cthulhu-mythos-thumbnail.jpg',
  name:'Cthulhu'},
  {url:'https://i.pinimg.com/originals/79/e6/4e/79e64e5ffb1e1012cc85dc265f9454e9.jpg',
  name:'Crom Cruach'},
  {url:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fff6d845-2bdd-4590-b9eb-165a5edad9c5/dd07cs-b02e76c6-d4e0-4337-a304-f3661c410e5f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZmZjZkODQ1LTJiZGQtNDU5MC1iOWViLTE2NWE1ZWRhZDljNVwvZGQwN2NzLWIwMmU3NmM2LWQ0ZTAtNDMzNy1hMzA0LWYzNjYxYzQxMGU1Zi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.nqGMhjqz78HJQNA87pbu-VW4NgQfjDtcjDFFnwm8HB4',
  name:'The Great Old One'},
  {url:'https://i.pinimg.com/originals/8b/2f/fb/8b2ffbbedc9ed6d74fa9437ed1970034.jpg',
  name:'Azathoth'},
  {url:'https://assets.bigcartel.com/product_images/240013415/HP+LOVECRAFT+-+By+Sam+Shearon+2017+-+Low+Resolution.jpg?auto=format&fit=max&w=780',
  name:'The Creator'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/dd7fdbc29f36348203837a6aacb8173b-500x657.jpg',
  name:'Dagon'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/Screenshot_20171020-125436-500x680.jpg',
  name:'Yog-Sothoth'},
  {url:'https://bookstr.com/wp-content/uploads/2019/08/img.png',
  name:'Nyarlathotep'},
  {url:'https://e0.pxfuel.com/wallpapers/392/688/desktop-wallpaper-cthulhu-sagas-mobile-cthulhu-mythos-thumbnail.jpg',
  name:'Cthulhu'},
  {url:'https://i.pinimg.com/originals/79/e6/4e/79e64e5ffb1e1012cc85dc265f9454e9.jpg',
  name:'Crom Cruach'},
  {url:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fff6d845-2bdd-4590-b9eb-165a5edad9c5/dd07cs-b02e76c6-d4e0-4337-a304-f3661c410e5f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZmZjZkODQ1LTJiZGQtNDU5MC1iOWViLTE2NWE1ZWRhZDljNVwvZGQwN2NzLWIwMmU3NmM2LWQ0ZTAtNDMzNy1hMzA0LWYzNjYxYzQxMGU1Zi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.nqGMhjqz78HJQNA87pbu-VW4NgQfjDtcjDFFnwm8HB4',
  name:'The Great Old One'},
  {url:'https://i.pinimg.com/originals/8b/2f/fb/8b2ffbbedc9ed6d74fa9437ed1970034.jpg',
  name:'Azathoth'}
]