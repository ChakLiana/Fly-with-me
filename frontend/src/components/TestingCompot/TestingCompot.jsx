// компонент для тестирования

import { useSelector } from "react-redux";

const Testing  = () => {
console.log('-=Testing compot render=-');

let x = useSelector(state => state.user)
console.log(x)

  return ( <div className="testing">
    <h1>Testing component</h1>
    {/* <img src="./pic2.svg" alt="SVG Here " /> */}
    < img src="http://localhost:3000/images/wolverine.jpg" />
  </div> );
}
 

export default Testing ;