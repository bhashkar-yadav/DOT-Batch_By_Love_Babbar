// import './App.css';
// import Item from './components/Item';
// import ItemDate from './components/ItemDate';

// function App() {
//   const itemTwoName = "Surf-Excel"
//   return (
//     <div>
//       <Item name="Nirma"></Item>
//       <ItemDate day="20" month="June" year="1998"></ItemDate>

//       <Item name={itemTwoName}></Item>
//       <ItemDate day="22" month="July" year="2000"></ItemDate>

//       <Item name="555"></Item>
//       <ItemDate day="24" month="Sept" year="2010"></ItemDate>
//       <div className="App">
//       Hello Ji
//     </div>

//     </div>
//   );
// }

// export default App;


import './App.css';
import Item from './components/Item';
import ItemDate from './components/ItemDate';
import Card from './components/Card';

function App() {
  const response = [
    {
      itemName:"Nirma",
      itemDate: "20",
      itemMonth: "June",
      itemYear:"1998"
    },
    {
      itemName:"Nirma2",
      itemDate: "21",
      itemMonth: "June2",
      itemYear:"1999"
    },
    {
      itemName:"Nirma3",
      itemDate: "22",
      itemMonth: "June3",
      itemYear:"2000"
    }
  ];
  return (
    <div>
      <Card>
      <Item name={response[0].itemName} >
      Hello ji kya haal chaal 
      {/* (children for this item so hume item me props.children likha hoga kyuki kisi component ke ander koi content dalne per visible nhi hota hai usko visible karane ke liye uss component me props.children likhna padta hai) */}
      </Item>

      <ItemDate day={response[0].itemDate}  month={response[0].itemMonth} year={response[0].itemYear}></ItemDate>

      <Item name={response[1].itemName} ></Item>
      <ItemDate day={response[1].itemDate}  month={response[1].itemMonth} year={response[1].itemYear}></ItemDate>

      <Item name={response[2].itemName} ></Item>
      <ItemDate day={response[2].itemDate}  month={response[2].itemMonth} year={response[2].itemYear}></ItemDate>

      <div className="App">Hello Ji
    </div>
      </Card>

    </div>
  );
}

export default App;